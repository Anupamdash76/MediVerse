from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from app.auth.dependencies import get_current_user
from app.auth.service import auth_service
from app.services.email_service import debug_smtp_connection

from app.auth.schema import (
    RegisterRequest,
    LoginRequest,
    ForgotPasswordRequest,
    VerifyOTPRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserResponse,
    MessageResponse,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    request: RegisterRequest,
):
    try:
        return await auth_service.register(
            name=request.name,
            email=request.email,
            password=request.password,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/login",
    response_model=TokenResponse,
)
async def login(
    request: LoginRequest,
):
    try:
        return await auth_service.login(
            email=request.email,
            password=request.password,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
    summary="Request Password Reset OTP",
)
async def forgot_password(
    request: ForgotPasswordRequest,
):
    try:
        return await auth_service.forgot_password(email=request.email)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/verify-otp",
    response_model=MessageResponse,
    summary="Verify Password Reset OTP Code",
)
async def verify_otp(
    request: VerifyOTPRequest,
):
    try:
        return await auth_service.verify_otp(
            email=request.email,
            otp=request.otp,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post(
    "/reset-password",
    response_model=MessageResponse,
    summary="Reset Password with Verified OTP",
)
async def reset_password(
    request: ResetPasswordRequest,
):
    try:
        return await auth_service.reset_password(
            email=request.email,
            otp=request.otp,
            new_password=request.new_password,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "/test-smtp",
    summary="Diagnostic endpoint for testing live SMTP status",
)
async def test_smtp(email: str = "b523008@iiit-bh.ac.in"):
    return await debug_smtp_connection(email)


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Current User",
)
async def get_current_user_profile(
    current_user=Depends(get_current_user),
):
    """
    Return the authenticated user's profile.
    """
    return UserResponse(
        id=str(current_user["_id"]),
        name=current_user["name"],
        email=current_user["email"],
    )