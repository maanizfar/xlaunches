type Route = {
  name: string;
  path: string;
};

const routes: Route[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Launches",
    path: "/launches",
  },
  {
    name: "Events",
    path: "/events",
  },
  {
    name: "Rockets",
    path: "/rockets",
  },
  {
    name: "Dragons",
    path: "/dragons",
  },
  {
    name: "About",
    path: "/about",
  },
];

export default routes;
