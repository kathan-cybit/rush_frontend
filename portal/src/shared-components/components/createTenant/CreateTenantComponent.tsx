import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { BackIcon, EditIcon } from "../../../assets/svgs";
import { useNavigate } from "react-router-dom";
import { CustomBreadCrumbs, Loader } from "../../ui";

interface TenantFormValues {
  domainname: string;
  company_name: string;
  status: string;
  gstNumber?: string;
  adminemail?: string;
  password?: string;
  contactperson: string;
  contactemail: string;
  phoneNumber: string;
}

interface FormStatus {
  mode: "view" | "edit" | null;
  tenant: any;
}

interface CreateTenantProps {
  register: UseFormRegister<TenantFormValues>;
  errors: FieldErrors<TenantFormValues>;
  licenses: any;
  FormStatus?: FormStatus;
  CurrData?: any;
  handleLicenseChange: (app: keyof any, value: number) => void;
  onDiscard: () => void;
  handleSubmit: () => void;
  BreadCrumbItems: Array<any>;
  handleReset: (e: "view" | "edit" | null, id: number | string | null) => void;
  navigate: ReturnType<typeof useNavigate>;
}

const CreateTenantComponent: React.FC<any> = ({
  isLoading,
  register,
  errors,
  licenses,
  allApps,
  FormStatus = { mode: null, tenant: null },
  CurrData = {},
  handleLicenseChange,
  onDiscard,
  navigate,
  handleReset,
  handleSubmit,
  BreadCrumbItems,
}) => {
  return (
    <>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <div className="clear-both flex justify-between items-center mb-[40px] overflow-hidden">
        <div>
          <div className="flex gap-2">
            <div
              className="content-center mt-2 border border-[#828282] border-[1px] rounded-[12px] w-[32px] h-[32px] text-center cursor-pointer"
              onClick={() => {
                if (!FormStatus?.mode) {
                  navigate("/dashboard");
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
                  ? "Create New Tenant"
                  : CurrData?.domain || ""}
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
                handleReset("edit", FormStatus?.tenant);
              }}
              className="px-[20px] py-[12px] rounded-[8px] max-w-[200px] primaryc-btn"
            >
              <div className="flex justify-between items-center gap-2">
                <div className="mb-1">{<EditIcon />}</div>
                <span>Edit Details</span>
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

      <form
        onSubmit={handleSubmit}
        className="bg-white mx-auto my-0 p-[40px] rounded-[8px] max-w-[1200px]"
      >
        <div className="mb-[25px] font-fsecondary text-[#adadad] text-[12px] text-[500] text-center uppercase tracking-[1.5px]">
          company details
        </div>

        <div className="clear-both mx-[-12px] mb-[24px] overflow-hidden">
          <div className="float-left px-[12px] w-[50%]">
            <label
              htmlFor="domainname"
              className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
            >
              Domain Name
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              disabled={!!FormStatus?.mode}
              type="text"
              className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.domainname ? "is-invalid" : ""
         }`}
              id="domainname"
              placeholder="Enter Tenant Name"
              {...register("domainname", {
                required: "Domain name is required",

                maxLength: {
                  value: 50,
                  message: "Cannot exceed 50 characters",
                },

                pattern: {
                  value: /^(?!pg_)(?![0-9])(?!_)[a-z0-9_]+$/,
                  message:
                    "Only lowercase letters, numbers, underscore allowed. Cannot start with number, underscore, or 'pg_'",
                },
              })}
            />
            {errors.domainname && (
              <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                {errors.domainname.message}
              </div>
            )}
          </div>

          <div className="float-left px-[12px] w-[50%]">
            <div className="col-md-12">
              <label
                htmlFor="status"
                className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
              >
                Status
              </label>
              <select
                disabled={FormStatus?.mode === "view"}
                id="status"
                className={`w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.status ? "is-invalid" : ""
         }`}
                {...register("status", {
                  required: "Status is required",
                })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {errors.status && (
                <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                  {errors.status.message}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="clear-both mx-[-12px] mb-[40px] overflow-hidden">
          <div className="float-left px-[12px] w-[50%]">
            <label
              htmlFor="company_name"
              className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
            >
              Full Legal Name
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              disabled={FormStatus?.mode === "view"}
              type="text"
              className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.company_name ? "is-invalid" : ""
         }`}
              id="company_name"
              placeholder="Enter Full Legal Name"
              {...register("company_name", {
                required: "Full legal name is required",
              })}
            />
            {errors.company_name && (
              <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                {errors.company_name.message}
              </div>
            )}
          </div>

          <div className="float-left px-[12px] w-[50%]">
            <label
              htmlFor="gstNumber"
              className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
            >
              GST Number
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              disabled={FormStatus?.mode === "view"}
              type="text"
              className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.gstNumber ? "is-invalid" : ""
         }`}
              id="gstNumber"
              placeholder="Enter the company's GST Number"
              {...register("gstNumber", {
                required: "GST Number is required",
                pattern: {
                  value:
                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: "Please enter a valid GST Number",
                },
              })}
            />
            {errors.gstNumber && (
              <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                {errors.gstNumber.message}
              </div>
            )}
          </div>
        </div>

        {!FormStatus?.mode && (
          <>
            <div className="mb-[25px] font-fsecondary text-[#adadad] text-[12px] text-[500] text-center uppercase tracking-[1.5px]">
              ADMIN DETAILS
            </div>
            <div className="clear-both mx-[-12px] mb-[24px] overflow-hidden">
              <div className="float-left px-[12px] w-[50%]">
                <label
                  htmlFor="adminemail"
                  className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
                >
                  Admin Email
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  autocomplete="off"
                  type="email"
                  className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.adminemail ? "is-invalid" : ""
         }`}
                  id="adminemail"
                  placeholder="Enter a valid email ID"
                  {...register("adminemail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.adminemail && (
                  <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                    {errors.adminemail.message}
                  </div>
                )}
              </div>

              <div className="float-left px-[12px] w-[50%]">
                <label
                  htmlFor="password"
                  className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
                >
                  Password
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  autocomplete="off"
                  type="password"
                  className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.password ? "is-invalid" : ""
         }`}
                  id="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special character required",
                    },
                  })}
                />
                {errors.password && (
                  <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="mb-[25px] font-fsecondary text-[#adadad] text-[12px] text-[500] text-center uppercase tracking-[1.5px]">
          CONTACT PERSON
        </div>

        <div className="clear-both mx-[-12px] mb-[24px] overflow-hidden">
          <div className="float-left px-[12px] w-[50%]">
            <label
              htmlFor="contactperson"
              className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
            >
              Contact person
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              autocomplete="off"
              disabled={FormStatus?.mode === "view"}
              type="text"
              className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.contactperson ? "is-invalid" : ""
         }`}
              id="contactperson"
              placeholder="Enter the contact's name"
              {...register("contactperson", {
                required: "contactperson name is required",
              })}
            />
            {errors.contactperson && (
              <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                {errors.contactperson.message}
              </div>
            )}
          </div>

          <div className="float-left px-[12px] w-[50%]">
            <label
              htmlFor="contactemail"
              className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
            >
              Email
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              autocomplete="off"
              disabled={FormStatus?.mode === "view"}
              type="text"
              className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.contactemail ? "is-invalid" : ""
         }`}
              id="contactemail"
              placeholder="Enter a valid email ID"
              {...register("contactemail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.contactemail && (
              <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                {errors.contactemail.message}
              </div>
            )}
          </div>
        </div>

        <div className="clear-both mx-[-12px] mb-[40px] overflow-hidden">
          <div className="float-left px-[12px] w-[50%]">
            <label
              htmlFor="phoneNumber"
              className="mb-[8px] text-[#1f2937] text-[14px] text-[500]"
            >
              Phone Number
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              autocomplete="off"
              disabled={FormStatus?.mode === "view"}
              type="tel"
              className={` w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.phoneNumber ? "is-invalid" : ""
         }`}
              id="phoneNumber"
              placeholder="Enter the contact's phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
            {errors.phoneNumber && (
              <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                {errors.phoneNumber.message}
              </div>
            )}
          </div>
          <div className="float-left mt-[5px] px-[12px] w-[50%]">
            <label className="text-[#1f2937] text-[14px] text-[500]">
              Single Organization
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="flex gap-6 mt-[8px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="true"
                  disabled={FormStatus?.mode === "view"}
                  {...register("singleOrganization")}
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="false"
                  disabled={FormStatus?.mode === "view"}
                  {...register("singleOrganization")}
                />
                <span>No</span>
              </label>
            </div>

            {errors.singleOrganization && (
              <div className="block mt-[4px] text-[#ef4444] text-[12px]">
                {errors.singleOrganization.message}
              </div>
            )}
          </div>
        </div>

        <div className="m-auto w-full text-center">
          <div className="mb-[25px] font-fsecondary text-[#adadad] text-[12px] text-[500] text-center uppercase tracking-[1.5px]">
            LICENSES
          </div>

          <div className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] mx-auto mt-0 rounded-[8px] overflow-hidden">
            <div className="form-table-header">
              <div className="flex-1 font-semibold text-gray-500 text-xs text-left tracking-[0.5px]">
                APPLICATION
              </div>
              <div className="w-[200px] font-semibold text-gray-500 text-xs text-center tracking-[0.5px]">
                ALLOT LICENSES
              </div>
            </div>

            {licenses?.length > 0 &&
              allApps?.map((app: any) => (
                <div className="table-row" key={app.id}>
                  <div className="row-application">{app.name}</div>
                  <div className="row-input">
                    <input
                      disabled={FormStatus?.mode == "view"}
                      type="number"
                      className="disabled:bg-[#ced4da] license-input"
                      value={
                        licenses?.find(
                          (license: any) => license.application_id == app.id
                        )?.count || 0
                      }
                      onChange={(e) =>
                        handleLicenseChange(app.id, e.target.value)
                      }
                      min="0"
                    />
                  </div>
                </div>
              ))}
            {/* <div className="table-row">
              <div className="row-application">Microsoft Team</div>
              <div className="row-input">
                <input
                  disabled={FormStatus?.mode === "view"}
                  type="number"
                  className="disabled:bg-[#ced4da] license-input"
                  value={licenses.microsoftTeam}
                  onChange={(e) =>
                    handleLicenseChange("microsoftTeam", Number(e.target.value))
                  }
                  min="0"
                />
              </div>
            </div>

            <div className="table-row">
              <div className="row-application">PowerPoint</div>
              <div className="row-input">
                <input
                  disabled={FormStatus?.mode === "view"}
                  type="number"
                  className="disabled:bg-[#ced4da] license-input"
                  value={licenses.powerPoint}
                  onChange={(e) =>
                    handleLicenseChange("powerPoint", Number(e.target.value))
                  }
                  min="0"
                />
              </div>
            </div>

            <div className="table-row">
              <div className="row-application">Outlook</div>
              <div className="row-input">
                <input
                  disabled={FormStatus?.mode === "view"}
                  type="number"
                  className="disabled:bg-[#ced4da] license-input"
                  value={licenses.outlook}
                  onChange={(e) =>
                    handleLicenseChange("outlook", Number(e.target.value))
                  }
                  min="0"
                />
              </div>
            </div>

            <div className="table-row">
              <div className="row-application">Excel</div>
              <div className="row-input">
                <input
                  disabled={FormStatus?.mode === "view"}
                  type="number"
                  className="disabled:bg-[#ced4da] license-input"
                  value={licenses.excel}
                  onChange={(e) =>
                    handleLicenseChange("excel", Number(e.target.value))
                  }
                  min="0"
                />
              </div>
            </div> */}
          </div>
        </div>

        {!FormStatus?.mode && (
          <div className="flex justify-between mt-[40px] pt-[30px] border-gray-200 border-t">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-white px-7 py-3 border border-[#d1d5db] border-[1px] border-none rounded-lg font-medium text-[#374151] text-sm transition-all duration-200 cursor-pointer"
              onClick={onDiscard}
            >
              <span>✕</span> Discard
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg font-medium text-white text-sm transition-all duration-200 cursor-pointer"
            >
              <span>✓</span> Create Tenant
            </button>
          </div>
        )}
        {FormStatus?.mode === "edit" && (
          <div className="flex justify-between mt-[40px] pt-[30px] border-gray-200 border-t">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-white px-7 py-3 border border-[#d1d5db] border-[1px] border-none rounded-lg font-medium text-[#374151] text-sm transition-all duration-200 cursor-pointer"
              onClick={onDiscard}
            >
              <span>✕</span> Discard
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg font-medium text-white text-sm transition-all duration-200 cursor-pointer"
            >
              <span>✓</span> Save Changes
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default CreateTenantComponent;
