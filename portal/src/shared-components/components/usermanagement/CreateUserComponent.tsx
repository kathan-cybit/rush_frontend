import React, { useMemo } from "react";
import { BackIcon, EditIcon } from "../../../assets/svgs";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { CustomBreadCrumbs } from "../../ui";
const SELECT_ALL_OPTION = {
  label: "Select All",
  value: "__select_all__",
};

const DESELECT_ALL_OPTION = {
  label: "",
  value: "",
};

export default function CreateUserComponent({
  allDetails,
  allLicenseWithCounts,
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
  allApps,
  defaultUserRoleOptions,
  allLicenses,
}) {
  const licensedAppIdSet = useMemo(() => {
    const set = new Set<any>();
    allLicenses?.forEach((l: any) => {
      set.add(l.application_id);
    });
    return set;
  }, [allLicenses]);

  const licenseCountMap = useMemo(() => {
    const map: any = {};
    allLicenseWithCounts?.forEach((l: any) => {
      map[l.application_id] = l.count;
    });
    return map;
  }, [allLicenseWithCounts]);

  const allSelected =
    roleOptions?.length > 0 &&
    control._formValues?.role_ids?.length === roleOptions.length;

  const selectOptions = [
    allSelected ? DESELECT_ALL_OPTION : SELECT_ALL_OPTION,
    ...roleOptions,
  ];

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
                {!FormStatus?.mode
                  ? "Create New User"
                  : CurrData?.first_name || ""}
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
                First Name
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                {...register("first_name", {
                  required: "First name is required",
                })}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter First name"
              />
              {errors.first_name && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Last Name
              </label>
              <input
                autoComplete="off"
                {...register("last_name")}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter Last name"
              />
              {errors.last_name && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Email
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                disabled={FormStatus?.mode == "view"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
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
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                disabled={FormStatus?.mode == "view"}
                {...register("phonenumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
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
                Status <span className="ml-1 text-red-500">*</span>
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

            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Address One
              </label>
              <input
                autoComplete="off"
                {...register("address_one")}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter First Address"
              />
              {errors.address_one && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.address_one.message}
                </p>
              )}
            </div>
            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Address Two
              </label>
              <input
                autoComplete="off"
                {...register("address_two")}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter Second Address"
              />
              {errors.address_two && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.address_two.message}
                </p>
              )}
            </div>
            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Country
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                {...register("country", {
                  required: "Country is required",
                  pattern: {
                    value: /^[A-Za-z ]{2,}$/i,
                    message: "Country must contain only letters",
                  },
                })}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter Country"
              />
              {errors.country && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                City
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                {...register("city", {
                  required: "City is required",
                  pattern: {
                    value: /^[A-Za-z ]{2,}$/i,
                    message: "City must contain only letters",
                  },
                })}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter City"
              />
              {errors.city && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="float-left mb-[15px] px-[12px] w-[50%]">
              <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                Pincode
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                autoComplete="off"
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^[1-9][0-9]{5}$/,
                    message: "Enter a valid 6-digit pincode",
                  },
                })}
                disabled={FormStatus?.mode == "view"}
                type="text"
                className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full transition-all"
                placeholder="Enter Pincode"
              />
              {errors.pincode && (
                <p className="mt-[4px] text-[12px] text-red-500">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            {!FormStatus?.mode && (
              <div className="float-left mb-[15px] px-[12px] w-[50%]">
                <label className="block mb-[8px] font-[500] text-[#1f2937] text-[14px]">
                  Password
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  autoComplete="off"
                  disabled={FormStatus?.mode == "view"}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special character required",
                    },
                  })}
                  type="password"
                  className="disabled:bg-[#ced4da] px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md outline-none w-full"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="mt-[4px] text-[12px] text-red-500">
                    {errors.password.message}
                  </p>
                )}
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
                  // <Select
                  //   {...field}
                  //   isMulti
                  //   options={roleOptions}
                  //   isDisabled={FormStatus?.mode === "view"}
                  //   value={roleOptions.filter((opt) =>
                  //     field.value?.includes(opt.value)
                  //   )}
                  //   onChange={(val) => field.onChange(val.map((x) => x.value))}
                  //   placeholder="Select roles..."
                  // />
                  <Select
                    isMulti
                    options={selectOptions}
                    isDisabled={FormStatus?.mode === "view"}
                    value={roleOptions.filter((opt) =>
                      field.value?.includes(opt.value)
                    )}
                    placeholder="Select roles..."
                    onChange={(selected: any) => {
                      if (!selected) {
                        field.onChange([]);
                        return;
                      }

                      if (
                        selected.some(
                          (opt: any) => opt.value === "__select_all__"
                        )
                      ) {
                        field.onChange(roleOptions.map((r) => r.value));
                        return;
                      }

                      field.onChange(selected.map((x: any) => x.value));
                    }}
                  />
                )}
              />
            </div>
          </div>

          <h3 className="mt-[25px] mb-8 font-[500] font-fsecondary text-[#adadad] text-[12px] text-center uppercase tracking-[1.5px]">
            Assigned Applications
          </h3>

          <div className="flex flex-wrap justify-center mb-[20px] px-[12px] w-full">
            {/* {allApps?.length > 0 &&
              allApps.map((app: any) => {
                const availableCount = licenseCountMap[app.id] ?? 0;

                return (
                  <div key={app.id} className="mb-[10px] w-[25%]">
                    <label className="flex items-center gap-2 text-[#1f2937] text-[14px]">
                      <input
                        type="checkbox"
                        disabled={FormStatus?.mode == "view"}
                        checked={assignedApps.includes(app.id)}
                        onChange={() => {
                          setAssignedApps((prev: number[]) =>
                            prev.includes(app.id)
                              ? prev.filter((x) => x != app.id)
                              : [...prev, app.id]
                          );
                        }}
                      />
                      {app.name}
                      <span className="text-gray-500 text-xs">
                        ({availableCount} available)
                      </span>
                    </label>
                  </div>
                );
              })} */}
            {allApps?.length > 0 &&
              allApps
                .filter((app: any) => licensedAppIdSet.has(app.id))
                .map((app: any) => {
                  const availableCount = licenseCountMap[app.id] ?? 0;
                  const isAssigned = assignedApps.includes(app.id);

                  return (
                    <div key={app.id} className="mb-[10px] w-[25%]">
                      <label className="flex items-center gap-2 text-[#1f2937] text-[14px]">
                        <input
                          type="checkbox"
                          disabled={
                            FormStatus?.mode === "view" ||
                            (!isAssigned && availableCount <= 0)
                          }
                          checked={isAssigned}
                          onChange={() => {
                            setAssignedApps((prev: number[]) =>
                              prev.includes(app.id)
                                ? prev.filter((x) => x !== app.id)
                                : [...prev, app.id]
                            );
                          }}
                        />
                        {app.name}
                        <span className="text-gray-500 text-xs">
                          ({availableCount} available)
                        </span>
                      </label>
                    </div>
                  );
                })}
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
