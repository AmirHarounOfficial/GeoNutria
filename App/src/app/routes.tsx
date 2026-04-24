import { createBrowserRouter } from "react-router";
import Root from "./screens/Root";
import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Diagnostics from "./screens/Diagnostics";
import Fields from "./screens/Fields";
import AddField from "./screens/AddField";
import FieldDetail from "./screens/FieldDetail";
import AIConsultant from "./screens/AIConsultant";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import FarmDetails from "./screens/FarmDetails";
import IoTDiagnosis from "./screens/IoTDiagnosis";
import LeafDisease from "./screens/LeafDisease";
import LeafDiseaseResult from "./screens/LeafDiseaseResult";
import SoilClassifier from "./screens/SoilClassifier";
import SoilClassifierResult from "./screens/SoilClassifierResult";
import CropRecommendation from "./screens/CropRecommendation";
import CropRecommendationResult from "./screens/CropRecommendationResult";
import YieldPrediction from "./screens/YieldPrediction";
import YieldPredictionResult from "./screens/YieldPredictionResult";
import PalmSegmentation from "./screens/PalmSegmentation";
import PalmSegmentationResult from "./screens/PalmSegmentationResult";
import PalmDisease from "./screens/PalmDisease";
import LeafSegmentation from "./screens/LeafSegmentation";
import PalmCounter from "./screens/PalmCounter";
import PalmCounterResult from "./screens/PalmCounterResult";
import Notifications from "./screens/Notifications";
import Reports from "./screens/Reports";
import ReportDetail from "./screens/ReportDetail";
import Subscription from "./screens/Subscription";
import Credits from "./screens/Credits";
import BuyCredits from "./screens/BuyCredits";
import Settings from "./screens/Settings";
import Help from "./screens/Help";
import Security from "./screens/Security";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/app",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "home", Component: Home },
      { path: "diagnostics", Component: Diagnostics },
      { path: "fields", Component: Fields },
      { path: "fields/add", Component: AddField },
      { path: "fields/:id", Component: FieldDetail },
      { path: "ai-consultant", Component: AIConsultant },
      { path: "profile", Component: Profile },
      { path: "edit-profile", Component: EditProfile },
      { path: "farm-details", Component: FarmDetails },
      { path: "iot-diagnosis", Component: IoTDiagnosis },
      { path: "leaf-disease", Component: LeafDisease },
      { path: "leaf-disease/result", Component: LeafDiseaseResult },
      { path: "soil-classifier", Component: SoilClassifier },
      { path: "soil-classifier/result", Component: SoilClassifierResult },
      { path: "crop-recommendation", Component: CropRecommendation },
      { path: "crop-recommendation/result", Component: CropRecommendationResult },
      { path: "yield-prediction", Component: YieldPrediction },
      { path: "yield-prediction/result", Component: YieldPredictionResult },
      { path: "palm-segmentation", Component: PalmSegmentation },
      { path: "palm-segmentation/result", Component: PalmSegmentationResult },
      { path: "palm-disease", Component: PalmDisease },
      { path: "leaf-segmentation", Component: LeafSegmentation },
      { path: "palm-counter", Component: PalmCounter },
      { path: "palm-counter/result", Component: PalmCounterResult },
      { path: "notifications", Component: Notifications },
      { path: "reports", Component: Reports },
      { path: "reports/:id", Component: ReportDetail },
      { path: "subscription", Component: Subscription },
      { path: "credits", Component: Credits },
      { path: "buy-credits", Component: BuyCredits },
      { path: "settings", Component: Settings },
      { path: "help", Component: Help },
      { path: "security", Component: Security },
    ],
  },
]);