import React, { useMemo } from "react";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { SvgIconComponent } from "@mui/icons-material";

import AdminView from "./AdminView";
import PreferencesView from "./PreferencesView";
import EventsTab from "./eventTabs/EventsTab";
import { User } from "firebase/auth";
import { ADMIN_USERS } from "utils/constants";

export interface DashbardViewSpec {
  key: string;
  label: string;
  icon: SvgIconComponent;
  component: React.ComponentType<any>;
  adminOnly?: boolean;
  props?: Record<string, any>;
}

const viewsList: DashbardViewSpec[] = [
  {
    key: 'watchers',
    label: 'Watchers',
    icon: ConfirmationNumberIcon,
    component: EventsTab,
    adminOnly: false,
    props: {
      events: [],
      onEventUpdate: () => {},
      onEventDelete: () => {},
    },
  },
  {
    key: "preferences",
    label: "Preferences",
    icon: SettingsIcon,
    component: PreferencesView,
    adminOnly: false,
  },
  {
    key: "admin",
    label: "Admin",
    icon: AdminPanelSettingsIcon,
    component: AdminView,
    adminOnly: true,
  },
];

export const useViewsList = (user: User | null | undefined) => {
  return useMemo(() => {
    if (user && ADMIN_USERS.includes(user.email ?? "")) {
      return viewsList;
    }
    return viewsList.filter((view) => !view.adminOnly);
  }, [user]);
};
