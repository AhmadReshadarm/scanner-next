import { navigateTo } from "common/helpers";
import { NextRouter } from "next/router";
import { signin } from "redux/slicers/authSlicer";
import { AppDispatch } from "redux/store";
import { Page } from "routes/constants";

export const handleFormSubmit = (router: NextRouter, dispatch: AppDispatch) => async (form) => {
  const res: any = await dispatch(signin(form));

  if (!res.error) {
    navigateTo(router, Page.ADMIN_CATEGORIES)();
  }
};
