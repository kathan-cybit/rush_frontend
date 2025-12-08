import React from "react";
import { BackIcon, EditIcon } from "../../../../assets/svgs";
import { CustomBreadCrumbs } from "../../../../components/breadCrumbs";
import { Controller } from "react-hook-form";
import Select from "react-select";

export default function CreateUserComponent({
  register,
  errors,
  navigate,
  handleSubmit,
  CurrData,
  FormStatus,
  onDiscard,
  handleReset,
  BreadCrumbItems,
  assignedApps,
  setAssignedApps,
  allRoles,
  control,
  roleOptions,
  defaultUserRoleOptions,
}) {
  return (
    <>
      <div className="clear-both flex justify-between items-center mb-[40px] overflow-hidden">
        <div>
          <div className="flex gap-2">
            <div
              className="content-center mt-2 border border-[#828282] border-[1px] rounded-[12px] w-[32px] h-[32px] text-center cursor-pointer"
              onClick={() => {
                if (!FormStatus?.mode) {
                  navigate("/usermanagement");
                } else {
                  handleReset(null, null);
                  // setFormStatus({ mode: null, tenant: null });
                }
              }}
            >
              <BackIcon className={"mx-auto"} />
            </div>
            <div>
              <h1 className="mb-0 font-fsecondary text-[32px] text-[500] leading-[140%] tracking-[0.25px]">
                {!FormStatus?.mode ? "Create New User" : CurrData?.name || ""}
              </h1>
              <CustomBreadCrumbs
                separator=">"
                items={BreadCrumbItems}
                className="font-[500] font-fsecondary text-[#adadad] text-[14px] leading-[140%] tracking-[0.25px]"
              />
            </div>
          </div>
        </div>
        <div>
          {FormStatus?.mode === "view" && (
            <div
              onClick={() => {
                handleReset("edit", FormStatus?.userId);
              }}
              className="px-[20px] py-[12px] rounded-[8px] max-w-[200px] primaryc-btn"
            >
              <div className="flex justify-between items-center gap-2">
                <div className="mb-1">{<EditIcon />}</div>
                <span>Edit User</span>
              </div>
            </div>
          )}
          {FormStatus?.mode === "edit" && (
            <div className="bg-[#f3f4fc] p-[12px] rounded-[8px] text-bsecondary">
              <div className="flex justify-between items-center gap-2">
                <div className="mb-1">{<EditIcon stroke={"#14258F"} />}</div>
                <span className="text-[16px] text-[500] text-bsecondary leading-[140%]">
                  You’re in Edit mode
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-sm p-[24px] rounded-[12px] w-full">
        <h2 className="mb-8 font-[500] font-fsecondary text-[#adadad] text-[12px] text-center uppercase tracking-[1.5px]">
          {FormStatus?.mode === "edit"
            ? "Edit User"
            : FormStatus?.mode === "view"
            ? "View User"
            : "New User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap pb-[20px] border-[#e5e7eb] border-b w-full">
            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Full Name
              </label>
              <input
                {...register("name")}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Email
              </label>
              <input
                disabled={FormStatus?.mode == "view"}
                {...register("email")}
                type="email"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
                placeholder="Enter user email"
              />
              {errors.email && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Phone Number
              </label>
              <input
                disabled={FormStatus?.mode == "view"}
                {...register("phonenumber")}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
                placeholder="Enter phone number"
              />
              {errors.phonenumber && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.phonenumber.message}
                </p>
              )}
            </div>

            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Status
              </label>
              <select
                disabled={FormStatus?.mode == "view"}
                {...register("status")}
                className="bg-white disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {!FormStatus?.mode && (
              <div className="float-left mb-[15px] px-[12px] w-[50%]">
                <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                  Password
                </label>
                <input
                  disabled={FormStatus?.mode == "view"}
                  {...register("password")}
                  type="password"
                  className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
                  placeholder="Enter password"
                />
              </div>
            )}
            <div className="float-left mt-[2px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Select Roles
              </label>

              <Controller
                name="role_ids"
                control={control}
                defaultValue={defaultUserRoleOptions.map((x) => x.value)}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={roleOptions}
                    isDisabled={FormStatus?.mode === "view"}
                    value={roleOptions.filter((opt) =>
                      field.value?.includes(opt.value)
                    )}
                    onChange={(val) => field.onChange(val.map((x) => x.value))}
                    placeholder="Select roles..."
                  />
                )}
              />
            </div>
          </div>

          <h3 className="mt-[25px] mb-8 font-[500] font-fsecondary text-[#adadad] text-[12px] text-center uppercase tracking-[1.5px]">
            Assigned Applications
          </h3>

          <div className="flex flex-wrap mb-[20px] px-[12px] w-full">
            {["teams", "outlook", "powerpoint", "excel"].map((app) => (
              <div key={app} className="mb-[10px] w-[25%]">
                <label className="flex items-center gap-2 text-[#1f2937] text-[14px]">
                  <input
                    className="disabled:bg-[#ced4da]"
                    disabled={FormStatus?.mode == "view"}
                    type="checkbox"
                    checked={assignedApps.includes(app)}
                    onChange={() => {
                      if (assignedApps.includes(app)) {
                        setAssignedApps(assignedApps.filter((x) => x !== app));
                      } else {
                        setAssignedApps([...assignedApps, app]);
                      }
                    }}
                  />
                  {app}
                </label>
              </div>
            ))}
          </div>

          {FormStatus?.mode != "view" && (
            <div className="flex justify-end gap-[12px] mt-[30px]">
              <button
                type="button"
                onClick={onDiscard}
                className="hover:bg-[#f1f1f1] px-[20px] py-[10px] border border-[#ced4da] rounded-md text-[#4b5563] text-[14px]"
              >
                Discard
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg font-medium text-white text-sm transition-all duration-200 cursor-pointer"
              >
                {FormStatus?.mode === "edit" ? "Update User" : "Create User"}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
