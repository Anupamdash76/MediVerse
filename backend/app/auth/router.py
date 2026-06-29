from fastapi import APIRouter, HTTPException, status

from app.auth.service import auth_service

from app.auth.schema import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
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