import { BiHome } from "react-icons/bi";
import Accommodation from "./pages/Accommodation";
import AccommodationDetails from "./pages/AccommodationDetails";
import AccommodationEdit from "./pages/AccommodationEdit";
import AccommodationPayment from "./pages/AccommodationPayment";

const NavRoutes = [
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
];

export default NavRoutes;
