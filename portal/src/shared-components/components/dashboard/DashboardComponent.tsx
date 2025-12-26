import React from "react";

import { CreateTenantContainer } from "../../containers";
import { Loader, TableV2 } from "../../ui";
import { AuthIcn } from "../../../assets/svgs";
import { ICExpert, PoleExpert, SimExpert } from "../../../assets/img";

interface DashboardProps {
  host: string | null;
  isLoading: boolean;
  tenants: any[];
  FormStatus: { mode: "view" | "edit" | null; tenant: string | null };
  CurrData: any;
  handleCreateTenant: () => void;
  handleViewTenant: (row: any) => void;
  handleEditTenant: (row: any) => void;
  setFormStatus: React.Dispatch<
    React.SetStateAction<{
      mode: "view" | "edit" | null;
      tenant: string | null;
    }>
  >;
}

export default function DashboardComponent({
  hasManageOrgSettings,
  allApps,
  token,
  allLicenses,
  filteredApps,
  user,
  host,
  isLoading,
  loading,
  tenants,
  FormStatus,
  CurrData,
  handleCreateTenant,
  handleViewTenant,
  handleEditTenant,
  setFormStatus,
  statusColorMap,
  menuItems,
  formattedTenants,
  allTenantWithLicenses,
}: any) {
  return (
    <>
      {(isLoading || loading) && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className="flex justify-between mb-5">
        {host !== "public" ? (
          <div>
            <h1 className="mb-0 font-fsecondary text-[32px] text-[500] leading-[140%] tracking-[0.25px]">
              {"Hi," + " " + user?.first_name + " " + user?.last_name}
            </h1>
            <span className="font-fsecondary text-[#adadad] text-[14px] text-[500] leading-[140%]">
              Continue to other apps
            </span>
          </div>
        ) : (
          <>
            {!FormStatus.mode && (
              <div>
                <h1 className="mb-0 font-fsecondary text-[32px] text-[500] leading-[140%] tracking-[0.25px]">
                  Tenants
                </h1>
                <span className="font-fsecondary text-[#adadad] text-[14px] text-[500] leading-[140%]">
                  All your Tenant Information
                </span>
              </div>
            )}
          </>
        )}
        {host != "public" && user?.is_default_admin ? (
          <div>
            {!FormStatus.mode && (
              <div
                onClick={handleCreateTenant}
                className="px-[20px] py-[12px] rounded-[8px] max-w-[200px] h-[45px] primaryc-btn"
              >
                <div className="flex justify-between items-center gap-2">
                  <div>{<AuthIcn />}</div>
                  <span>{"Go to Admin Panel"}</span>
                </div>
              </div>
            )}
          </div>
        ) : host == "public" ? (
          <div>
            {!FormStatus.mode && (
              <div
                onClick={handleCreateTenant}
                className="px-[20px] py-[12px] rounded-[8px] max-w-[200px] h-[45px] primaryc-btn"
              >
                <div className="flex justify-between items-center gap-2">
                  <div>{"＋"}</div>
                  <span>{"New Tenant"}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      {host != "public" && user?.is_default_admin ? (
        <div className="flex flex-wrap justify-center -mx-3">
          {filteredApps?.length > 0 &&
            filteredApps.map((e: any, index: number | string) => {
              return (
                <div className="px-2 w-1/4" key={index}>
                  <a
                    href={`${e.url}?token=${token}&domain=${host}`}
                    target="_blank"
                    className="flex flex-col justify-between items-center hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] px-4 pt-12 pb-6 border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[280px] text-center transition-all hover:-translate-y-1.5 duration-200 cursor-pointer"
                  >
                    <div className="max-w-[130px] max-h-[140px]">
                      <img
                        className="w-full h-full object-contain"
                        src={
                          e?.id == "ICXpert"
                            ? SimExpert
                            : e?.name == "PoleXpert"
                            ? PoleExpert
                            : ICExpert
                        }
                        alt="Teams"
                      />
                    </div>
                    <h2 className="mb-0 font-fsecondary text-[24px] text-[500] leading-[140%]">
                      {e?.name}
                    </h2>
                    <h2>
                      Licenses left:{" "}
                      {
                        allLicenses.filter(
                          (license): any =>
                            license.application_id == e?.id &&
                            license.status == "free"
                        )?.length
                      }{" "}
                      out of{" "}
                      {
                        allLicenses?.filter((f: any) => {
                          return f?.application_id == e?.id;
                        })?.length
                      }
                    </h2>
                  </a>
                </div>
              );
            })}
        </div>
      ) : host == "public" ? (
        <>
          {!FormStatus.mode ? (
            <>
              <div className="flex flex-wrap -mx-3">
                <div className="px-2 w-1/2">
                  <div className="flex justify-between items-start p-[16px] border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[135px] text-center cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-fsecondary text-[400] text-[56px] text-textPrimary text-start">
                        {
                          tenants?.filter((item) => item.status == "active")
                            .length
                        }
                      </span>
                      <span className="text-[#555555] text-[14px] text-[400] leading-[140%]">
                        Active Tenants
                      </span>
                    </div>
                    <div>
                      <span className={`badge-parent active`}>
                        <span className={`status-badge active`}>
                          <span className="status-dot"></span>
                          {"active"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <div className="flex justify-between items-start p-[16px] border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[135px] text-center cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-fsecondary text-[400] text-[56px] text-textPrimary text-start">
                        {
                          tenants?.filter((item) => item.status != "active")
                            .length
                        }
                      </span>
                      <span className="text-[#555555] text-[14px] text-[400] leading-[140%]">
                        Inactive Tenants
                      </span>
                    </div>
                    <div>
                      <span className={`badge-parent inactive`}>
                        <span className={`status-badge inactive`}>
                          <span className="status-dot"></span>
                          {"Inactive"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="px-2 w-1/3">
                  <div className="flex justify-between items-start p-[16px] border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[135px] text-center cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-fsecondary text-[400] text-[56px] text-textPrimary text-start">
                        0
                      </span>
                      <span className="text-[#555555] text-[14px] text-[400] leading-[140%]">
                        Renewals due next week
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="mt-5">
                {tenants?.length > 0 && (
                  <TableV2
                    data={formattedTenants}
                    menuItems={menuItems}
                    statusColorMap={statusColorMap}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              {FormStatus.mode && FormStatus.tenant && CurrData && (
                <CreateTenantContainer
                  setFormStatus={setFormStatus}
                  FormStatus={FormStatus}
                  CurrData={CurrData}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-wrap justify-center -mx-3">
            {filteredApps?.length > 0 &&
              allLicenses
                .filter((item) => item.assigned_to == user?.id)
                .map((item) => item.application_id)?.length > 0 &&
              filteredApps
                .filter((app: any) =>
                  allLicenses
                    .filter((item) => item.assigned_to == user?.id)
                    .map((item) => item.application_id)
                    .includes(app.id)
                )
                ?.map((e: any, index: number | string) => {
                  return (
                    <div className="px-2 w-1/4" key={index}>
                      <a
                        href={`${e.url}?token=${token}&domain=${host}`}
                        target="_blank"
                        className="flex flex-col justify-between items-center hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] px-4 pt-12 pb-6 border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[280px] text-center transition-all hover:-translate-y-1.5 duration-200 cursor-pointer"
                      >
                        <div className="max-w-[130px] max-h-[140px]">
                          <img
                            className="w-full h-full object-contain"
                            src={
                              index == 0
                                ? ICExpert
                                : index == 1
                                ? PoleExpert
                                : SimExpert
                            }
                            alt="Teams"
                          />
                        </div>
                        <h2 className="mb-0 font-fsecondary text-[24px] text-[500] leading-[140%]">
                          {e?.name}
                        </h2>
                      </a>
                    </div>
                  );
                })}
          </div>
        </>
      )}
    </>
  );
}
