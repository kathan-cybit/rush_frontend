import React, { useEffect, useMemo, useState } from "react";
import ApplicationComponent from "../../components/application/ApplicationComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Loader } from "../../ui";
import {
  createLicenseApps,
  deleteLicenseApps,
  getLicenseApps,
  updateLicenseApps,
} from "../../../store/reducers/licenseSlice";
import EditIcn from "../../../assets/svgs/EditIcn";
import { DeleteIcon } from "../../../assets/svgs";
import { useForm } from "react-hook-form";
import { formatUtcToIST } from "../../../utils/commonFunctions";

export default function ApplicationContainer({ navigateFunction }) {
  const host = new URL(globalThis.location.href).hostname.split(".")[0];

  const dispatch = useDispatch<AppDispatch>();

  const { tenantType, loading } = useSelector((state: RootState) => state.auth);
  const { allApps, loading: loading2 } = useSelector(
    (state: RootState) => state.license,
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      appname: null,
      appDescription: null,
      appUrl: null,
      organization_id: null,
    },
  });
  const BreadCrumbItems = [
    {
      title: "Home",
      onClick: () => {
        navigateFunction("/dashboard");
      },
    },
    {
      title: "Applications",
    },
  ];

  const [openCreateEditAppModal, setCreateEditAppModal] = useState<any>({
    row: null,
    mode: false,
    type: null,
  });
  const [ConfirmDelete, setConfirmDelete] = useState<any>({
    mode: false,
    row: null,
  });
  const modaleleteClose = () => {
    setConfirmDelete({ mode: false, row: null });
  };
  const closeCreateEditModal = () => {
    setCreateEditAppModal({
      row: null,
      mode: false,
      type: null,
    });
  };

  const deleteEntry = async (row: any, host: any, tenantType: any) => {
    dispatch(
      deleteLicenseApps({
        role: tenantType,
        id: row?.id,
        headers: { "x-tenant-id": host },
      }),
    )
      .unwrap()
      .then(() => {
        modaleleteClose();
        dispatch(
          getLicenseApps({
            role: tenantType,
            headers: { "x-tenant-id": host },
          }),
        );
      })
      .catch(() => {});
  };

  const formattedRoles = useMemo(() => {
    return allApps
      ?.filter((e: any) => e?.is_active == true)
      .map((i: any) => ({
        id: i?.id,
        url: i?.url,
        "app name": i?.name,
        description: i?.description,
        // "Created At": formatUtcToIST(i?.created_at),
        // "Last Updated": formatUtcToIST(i.updated_at),
      }));
  }, [allApps]);

  const statusColorMap = {};
  const menuItems = [
    {
      label: "Edit",
      color: "blue",
      icon: <EditIcn color="#228be6" />,
      onClick: (row: any) => {
        setCreateEditAppModal({ row: row?.id, mode: true, type: "edit" });
      },
    },
    // {
    //   label: "Delete",
    //   color: "#ef4444",
    //   icon: <DeleteIcon color="#ef4444" />,
    //   onClick: (row: any) => {
    //     setConfirmDelete({ mode: true, row: row });
    //   },
    // },
  ];

  const onSubmit = (data: any) => {
    if (openCreateEditAppModal.type == "edit") {
      dispatch(
        updateLicenseApps({
          id: openCreateEditAppModal.row,
          role: tenantType,
          payload: {
            url: data?.appUrl,
            name: data?.appname,
            description: data?.appDescription,
            organization_id: data?.organization_id,
            is_active: true,
          },
          headers: { "x-tenant-id": host },
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(
            getLicenseApps({
              role: tenantType,
              headers: { "x-tenant-id": host },
            }),
          );
        })
        .catch(() => {});
    }
    if (openCreateEditAppModal.type == "create") {
      dispatch(
        createLicenseApps({
          role: tenantType,
          payload: {
            url: data?.appUrl,
            name: data?.appname,
            description: data?.appDescription,
            organization_id: data?.organization_id,
            is_active: true,
          },
          headers: { "x-tenant-id": host },
        }),
      )
        .unwrap()
        .then(() => {
          dispatch(
            getLicenseApps({
              role: tenantType,
              headers: { "x-tenant-id": host },
            }),
          );
        })
        .catch(() => {});
    }

    reset();
    closeCreateEditModal();
    return;
  };

  useEffect(() => {
    dispatch(
      getLicenseApps({
        role: tenantType,
        headers: { "x-tenant-id": host },
      }),
    );
  }, []);

  useEffect(() => {
    if (
      allApps &&
      allApps?.length > 0 &&
      openCreateEditAppModal?.row &&
      openCreateEditAppModal?.mode &&
      openCreateEditAppModal?.type == "edit"
    ) {
      const datax: any = allApps?.find(
        (e: any) => e?.id == openCreateEditAppModal?.row,
      );
      setValue("appname", datax?.name);
      setValue("appDescription", datax?.description);
      setValue("appUrl", datax?.url);
      setValue("organization_id", datax?.organization_id);
    }
    if (!openCreateEditAppModal.mode) {
      reset();
    }
  }, [openCreateEditAppModal]);

  return (
    <div className="">
      {(loading || loading2) && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className="mx-auto">
        <div className="p-4">
          <ApplicationComponent
            ConfirmDelete={ConfirmDelete}
            modaleleteClose={modaleleteClose}
            host={host}
            formattedRoles={formattedRoles}
            statusColorMap={statusColorMap}
            tenantType={tenantType}
            menuItems={menuItems}
            deleteEntry={deleteEntry}
            closeCreateEditModal={closeCreateEditModal}
            openCreateEditAppModal={openCreateEditAppModal}
            setCreateEditAppModal={setCreateEditAppModal}
            BreadCrumbItems={BreadCrumbItems}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
          />
        </div>
      </div>
    </div>
  );
}
