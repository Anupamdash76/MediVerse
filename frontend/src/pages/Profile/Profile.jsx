import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import ProfileCompletion from "../../components/profile/ProfileCompletion";
import PersonalInformation from "../../components/profile/PersonalInformation";
import MedicalInformation from "../../components/profile/MedicalInformation";

import useProfile from "../../hooks/useProfile";

export default function Profile() {

  const {
    profile,
    loading,
    saving,
    exists,
    saveProfile,
  } = useProfile();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
    blood_group: "",
    allergies: "",
    chronic_diseases: "",
    current_medications: "",
  });

  useEffect(() => {

    if (!profile) return;

    setForm({

      age: profile.age ?? "",

      gender: profile.gender ?? "",

      height_cm: profile.height_cm ?? "",

      weight_kg: profile.weight_kg ?? "",

      blood_group: profile.blood_group ?? "",

      allergies: (profile.allergies || []).join(", "),

      chronic_diseases: (
        profile.chronic_diseases || []
      ).join(", "),

      current_medications: (
        profile.current_medications || []
      ).join(", "),

    });

  }, [profile]);

  function handleChange(event) {

    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  }

  const completion = useMemo(() => {

    const fields = [
      form.age,
      form.gender,
      form.height_cm,
      form.weight_kg,
      form.blood_group,
      form.allergies,
      form.chronic_diseases,
      form.current_medications,
    ];

    const completed =
      fields.filter(
        (item) =>
          item !== "" &&
          item !== null &&
          item !== undefined
      ).length;

    return Math.round(
      (completed / fields.length) * 100
    );

  }, [form]);

  async function handleSubmit(event) {

    event.preventDefault();

    const payload = {

      age: Number(form.age),

      gender: form.gender,

      height_cm: Number(form.height_cm),

      weight_kg: Number(form.weight_kg),

      blood_group: form.blood_group,

      allergies: form.allergies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      chronic_diseases:
        form.chronic_diseases
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      current_medications:
        form.current_medications
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

    };

    const success = await saveProfile(
      payload
    );

    if (success) {

      alert(
        exists
          ? "Profile updated successfully."
          : "Profile created successfully."
      );

    }

    else {

      alert(
        "Unable to save profile."
      );

    }

  }

  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex h-[60vh] items-center justify-center">

          <p className="text-xl font-semibold">

            Loading Profile...

          </p>

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <div className="mx-auto max-w-5xl space-y-8">

        {/* Page Header */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            My Profile

          </h1>

          <p className="mt-2 text-slate-500">

            Keep your health information updated
            for more accurate AI-powered diagnosis.

          </p>

        </div>

        {/* Completion */}

        <ProfileCompletion
          percentage={completion}
        />

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <PersonalInformation
            form={form}
            handleChange={handleChange}
          />

          <MedicalInformation
            form={form}
            handleChange={handleChange}
          />

          {/* Save Button */}

          <div className="flex justify-center">

            <button
              type="submit"
              disabled={saving}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-10
                py-4
                text-lg
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-[1.02]
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {saving
                ? "Saving..."
                : exists
                ? "Update Profile"
                : "Create Profile"}

            </button>

          </div>

        </form>

      </div>

    </DashboardLayout>

  );

}