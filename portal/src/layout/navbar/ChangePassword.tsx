import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updatePassword } from "../../store/reducers/authSlice";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface ChangePasswordForm {
  old_password: string;
  confirm_password: string;
  new_password: string;
}

export default function ChangePassword({ setIsOpen }) {
  const dispatch = useDispatch<AppDispatch>();
  const host = new URL(window.location.href).hostname.split(".")[0];
  const { tenantType, user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ChangePasswordForm>();
  const newPassword = watch("new_password");
  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    try {
      await dispatch(
        updatePassword({
          role: tenantType,
          payload: { id: user?.id, ...data },
          headers: { "x-tenant-id": host },
        })
      )
        .unwrap()
        .then(() => {
          reset();
          setIsOpen(false);
        })
        .catch(() => {});
    } catch (err) {
      console.error("Change password failed:", err);
    }
  };

  return (
    <div className="flex justify-center pb-[30px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap max-w-[500px]"
      >
        {/* Old Password */}
        <div className="float-left mb-[15px] px-[12px] w-full">
          <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
            Current Password
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter old password"
            {...register("old_password", {
              required: "Old password is required",
            })}
            className="px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
          />
          {errors.old_password && (
            <p className="mt-[4px] text-[12px] text-red-500">
              {errors.old_password.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="float-left mb-[15px] px-[12px] w-full">
          <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
            New Password
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            {...register("new_password", {
              required: "New password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special character required",
              },
            })}
            className="px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
          />
          {errors.new_password && (
            <p className="mt-[4px] text-[12px] text-red-500">
              {errors.new_password.message}
            </p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="float-left mb-[15px] px-[12px] w-full">
          <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
            Confirm Password
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            {...register("confirm_password", {
              required: "Confirm password is required",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
          />

          {errors.confirm_password && (
            <p className="mt-[4px] text-[12px] text-red-500">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="mt-4 px-[12px] w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-[20px] py-[12px] rounded-[8px] w-full primaryc-btn"
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
