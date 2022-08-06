import { lazy } from "react";

const Dashboard = lazy(() => import("modules/Dashboard"));
const Game = lazy(() => import("modules/Games/Game"));
const IceBreaker = lazy(() => import("modules/IceBreaker"));
const CreateGame = lazy(() => import("modules/Games/Game/addGame"));
const Account = lazy(() => import("modules/Account"));
const CreateIceBreaker = lazy(() => import("modules/IceBreaker/AddIceBreaker"));
const Tool = lazy(() => import("modules/Tools"));
const GameReview = lazy(() => import("modules/Games/Reviews"));
const PageNotFound = lazy(() => import("components/common/PageNotFound"));
const SpinWheel = lazy(() => import("components/wheel/wheel"));
const Faq = lazy(() => import("components/common/Footer/Faq"));
const Tutorial = lazy(() => import("components/common/Footer/Tutorial"));
const TutorialDetail = lazy(() =>
  import("components/common/Footer/TutorialDetail")
);

const protectedRoutes = [
  { path: "/", exact: true, component: Dashboard },
  { path: "/games/filter/:id", exact: true, component: Dashboard },
  { path: "/games/*", exact: true, component: Dashboard },
  { path: "/games", exact: true, component: Game },
  { path: "/game/add", exact: true, component: CreateGame },
  { path: "/game/edit/:id", exact: true, component: CreateGame },
  { path: "/game/:id", exact: true, component: Game },
  { path: "/reviews/:id", exact: true, component: GameReview },
  { path: "/icebreaker", exact: true, component: IceBreaker },
  { path: "/accounts/:activeTab", exact: true, component: Account },
  { path: "/accounts", exact: true, component: Account },
  { path: "/icebreaker/add", exact: true, component: CreateIceBreaker },
  { path: "/icebreaker/edit/:id", exact: true, component: CreateIceBreaker },
  { path: "/tool/wheel1", exact: true, component: SpinWheel },
  { path: "/tool/:activeTab", exact: true, component: Tool },
  { path: "/tool", exact: true, component: Tool },
  { path: "/faq", exact: true, component: Faq },
  { path: "/tutorial", exact: true, component: Tutorial },
  { path: "/tutorialDetail/:id", exact: true, component: TutorialDetail },
  { path: "/:name", exact: true, component: Game },
  { path: "*", exact: true, component: PageNotFound },
];

export default protectedRoutes;
