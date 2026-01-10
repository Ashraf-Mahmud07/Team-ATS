import { setPageTitle } from "@/store/services/pageTitleSlice";
import { JSX, useEffect } from "react";
import { useDispatch } from "react-redux";

type PageHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: PageHeaderProps): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    const plainTitle = title.replace(/<[^>]+>/g, "");
    dispatch(setPageTitle(plainTitle));
  }, [dispatch, title]);

  return <></>;
};

export default PageHeader;
