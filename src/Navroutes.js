import { FiUserPlus } from "react-icons/fi";
import {
  HiOutlineSpeakerphone,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { TfiStatsUp } from "react-icons/tfi";
import { IoTrophyOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { BsBuildings } from "react-icons/bs";
import { GrGraphQl } from "react-icons/gr";
import { GoMail } from "react-icons/go";
import EditWebsite from "./pages/EditWebsite";
import EventReg from "./pages/EventReg";
import PaperReg from "./pages/PaperReg";
import ReferralLeaderboard from "./pages/ReferralLeaderboard";
import WorkshopReg from "./pages/WorkshopReg";
import Accommodation from "./pages/Accommodation";
import OnSpotRegistration from "./pages/OnSpotRegistration";
import Statistics from "./pages/Statistics";
import CollegeUsers from "./pages/CollegeUsers";
import Graph from "./pages/Graph";
import SendMail from "./pages/SendMail";
import DepartmentWise from "./pages/DepartmentWise";
import AccommodationDetails from "./pages/AccommodationDetails";
import AccommodationEdit from "./pages/AccommodationEdit";
import AccommodationPayment from "./pages/AccommodationPayment";

const NavRoutes = [
  {
    title: "Register On Spot",
    icon: <FiUserPlus />,
    href: "/register-on-spot",
    element: <OnSpotRegistration />,
  },
  {
    title: "Statistics",
    icon: <TfiStatsUp />,
    href: "/statistics",
    element: <Statistics />,
  },
  {
    title: "College Wise Users",
    icon: <BsBuildings />,
    href: "/college-users",
    element: <CollegeUsers />,
  },
  // {
  //   title: "Edit Website Content",
  //   icon: <BsCalendarEventFill />,
  //   href: "/edit-website",
  //   element: <EditWebsite />,
  // },
  {
    title: "Referral Leaderboard",
    icon: <HiOutlineSpeakerphone />,
    href: "/referral-leaderboard",
    element: <ReferralLeaderboard />,
  },
  {
    title: "Event Registrations",
    icon: <IoTrophyOutline />,
    href: "/event-reg",
    element: <EventReg />,
  },
  {
    title: "Workshop Registrations",
    icon: <FaChalkboardTeacher />,
    href: "/workshop-reg",
    element: <WorkshopReg />,
  },
  {
    title: "Paper Registrations",
    icon: <HiOutlinePresentationChartBar />,
    href: "/paper-reg",
    element: <PaperReg />,
  },
  {
    title: "Accommodation",
    icon: <BiHome />,
    href: "/accommodation",
    element: <Accommodation />,
  },
  {
    title: "Accommodation Details",
    icon: <BiHome />,
    href: "/accommodation-details",
    element: <AccommodationDetails />,
  },
  {
    title: "Edit Accommodation",
    icon: <BiHome />,
    href: "/accommodation-edit",
    element: <AccommodationEdit />,
  },
  {
    title: "Accommodation Payment",
    icon: <BiHome />,
    href: "/accommodation-payment",
    element: <AccommodationPayment />,
  },
  {
    title: "Graphs",
    icon: <GrGraphQl />,
    href: "/graphs",
    element: <Graph />,
  },
  {
    title: "Send Mail",
    icon: <GoMail />,
    href: "/send-mail",
    element: <SendMail />,
  },
  {
    title: "Department Wise",
    icon: <HiOutlineBuildingOffice />,
    href: "/department-wise",
    element: <DepartmentWise />,
  },
];

export default NavRoutes;
