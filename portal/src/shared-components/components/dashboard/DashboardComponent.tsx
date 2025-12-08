import React from "react";

import { CreateTenantContainer } from "../../containers";
import { Loader, TableV2 } from "../../ui";
import { AuthIcn } from "../../../assets/svgs";
import { ExcelImg, OutlookImg, PpImg, TeamsImg } from "../../../assets/img";

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
  host,
  isLoading,
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
}: any) {
  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className="flex justify-between items-center mb-5">
        {host !== "public" ? (
          <div>
            <h1 className="mb-0 font-fsecondary text-[32px] text-[500] leading-[140%] tracking-[0.25px]">
              Hi, Rishabh
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
        <div>
          {!FormStatus.mode && (
            <div
              onClick={handleCreateTenant}
              className="px-[20px] py-[12px] rounded-[8px] max-w-[200px] primaryc-btn"
            >
              <div className="flex justify-between items-center gap-2">
                <div>{host !== "public" ? <AuthIcn /> : "＋"}</div>
                <span>
                  {host !== "public" ? "Go to Admin Panel" : "New Tenant"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {host !== "public" ? (
        <div className="flex flex-wrap -mx-3">
          <div className="px-2 w-1/4">
            <div className="flex flex-col justify-between items-center hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] px-4 pt-12 pb-6 border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[280px] text-center transition-all hover:-translate-y-1.5 duration-200 cursor-pointer">
              <div className="max-w-[130px] max-h-[140px]">
                <img
                  className="w-full h-full object-contain"
                  src={ExcelImg}
                  alt="Excel"
                />
              </div>
              <h2 className="mb-0 font-fsecondary text-[24px] text-[500] leading-[140%]">
                Excel
              </h2>
            </div>
          </div>
          <div className="px-2 w-1/4">
            <div className="flex flex-col justify-between items-center hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] px-4 pt-12 pb-6 border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[280px] text-center transition-all hover:-translate-y-1.5 duration-200 cursor-pointer">
              <div className="max-w-[130px] max-h-[140px]">
                <img
                  className="w-full h-full object-contain"
                  src={OutlookImg}
                  alt="Outlook"
                />
              </div>
              <h2 className="mb-0 font-fsecondary text-[24px] text-[500] leading-[140%]">
                Outlook
              </h2>
            </div>
          </div>
          <div className="px-2 w-1/4">
            <div className="flex flex-col justify-between items-center hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] px-4 pt-12 pb-6 border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[280px] text-center transition-all hover:-translate-y-1.5 duration-200 cursor-pointer">
              <div className="max-w-[130px] max-h-[140px]">
                <img
                  className="w-full h-full object-contain"
                  src={TeamsImg}
                  alt="Teams"
                />
              </div>
              <h2 className="mb-0 font-fsecondary text-[24px] text-[500] leading-[140%]">
                Teams
              </h2>
            </div>
          </div>
          <div className="px-2 w-1/4">
            <div className="flex flex-col justify-between items-center hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] px-4 pt-12 pb-6 border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[280px] text-center transition-all hover:-translate-y-1.5 duration-200 cursor-pointer">
              <div className="max-w-[130px] max-h-[140px]">
                <img
                  className="w-full h-full object-contain"
                  src={PpImg}
                  alt="PowerPoint"
                />
              </div>
              <h2 className="mb-0 font-fsecondary text-[24px] text-[500] leading-[140%]">
                Powerpoint
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <>
          {!FormStatus.mode ? (
            <>
              <div className="flex flex-wrap -mx-3">
                <div className="px-2 w-1/3">
                  <div className="flex justify-between items-start p-[16px] border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[135px] text-center cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-fsecondary text-[400] text-[56px] text-textPrimary text-start">
                        25
                      </span>
                      <span className="text-[#555555] text-[14px] text-[400] leading-[140%]">
                        Active tenants
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
                <div className="px-2 w-1/3">
                  <div className="flex justify-between items-start p-[16px] border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[135px] text-center cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-fsecondary text-[400] text-[56px] text-textPrimary text-start">
                        13
                      </span>
                      <span className="text-[#555555] text-[14px] text-[400] leading-[140%]">
                        Inactive tenants
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
                <div className="px-2 w-1/3">
                  <div className="flex justify-between items-start p-[16px] border border-[#e4e5e7] border-[1.2px] rounded-[16px] h-[135px] text-center cursor-pointer">
                    <div className="flex flex-col">
                      <span className="font-fsecondary text-[400] text-[56px] text-textPrimary text-start">
                        2
                      </span>
                      <span className="text-[#555555] text-[14px] text-[400] leading-[140%]">
                        Renewals due next week
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                {tenants?.length > 0 && (
                  <TableV2
                    data={formattedTenants}
                    menuItems={menuItems}
                    statusColorMap={statusColorMap}
                    defaultSort={{ key: "company", direction: "asc" }}
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
      )}
    </>
  );
}
