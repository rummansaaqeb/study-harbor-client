import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import SessionDetails from "../pages/SessionDetails";
import PrivateRoute from "./PrivateRoute";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import ViewBookedSessions from "../pages/StudentDashboard/ViewBookedSessions";
import Notes from "../pages/StudentDashboard/Notes";
import ManageNotes from "../pages/StudentDashboard/ManageNotes";
import NoteDetails from "../pages/StudentDashboard/NoteDetails";
import UpdateNote from "../pages/StudentDashboard/UpdateNote";
import TutorDashboard from "../pages/TutorDashboard/TutorDashboard";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";
import CreateSession from "../pages/TutorDashboard/CreateSession";
import ViewStudySessions from "../pages/TutorDashboard/ViewStudySessions";
import ViewMaterials from "../pages/TutorDashboard/ViewMaterials";
import UploadMaterials from "../pages/TutorDashboard/uploadMaterials";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/AdminDashboard/AllUsers";
import AllSessions from "../pages/AdminDashboard/AllSessions";
import UpdateSession from "../pages/AdminDashboard/UpdateSession";
import AllMaterials from "../pages/AdminDashboard/AllMaterials";
import Payment from "../pages/Payment";
import ViewStudyMaterials from "../pages/StudentDashboard/ViewStudyMaterials";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>
    },
    {
        path: '/session/:id',
        element: <PrivateRoute><SessionDetails></SessionDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://b10a12-server-side-rummansaaqeb.vercel.app/session/${params.id}`) 
    },
    {
        path: 'auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: "login", 
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/dashboard/student',
        element: <StudentRoute><StudentDashboard></StudentDashboard></StudentRoute>,
        children: [
            {
                path: 'bookedSessions',
                element: <ViewBookedSessions></ViewBookedSessions>
            },
            {
                path: 'notes',
                element: <Notes></Notes>
            },
            {
                path: 'manageNotes',
                element: <ManageNotes></ManageNotes>,
            },
            {
               path: 'note/:id',
               element: <NoteDetails></NoteDetails>,
               loader: ({params}) => fetch(`https://b10a12-server-side-rummansaaqeb.vercel.app/note/${params.id}`) 
            },
            {
                path: 'viewMaterials',
                element: <ViewStudyMaterials></ViewStudyMaterials>
            },

            {
                path: 'updateNote/:id',
                element: <UpdateNote></UpdateNote>
            }

        ]
    },
    {
        path: '/dashboard/tutor',
        element: <TutorRoute><TutorDashboard></TutorDashboard></TutorRoute>,
        children: [
            {
                path: 'createSession',
                element: <CreateSession></CreateSession>
            },
            {
                path: 'viewStudySessions',
                element: <ViewStudySessions></ViewStudySessions>
            },
            {
                path: 'uploadMaterials',
                element: <UploadMaterials></UploadMaterials>
            },
            {
                path: 'viewMaterials',
                element: <ViewMaterials></ViewMaterials>,
            },
        ]
    },
    {
        path: '/dashboard/admin',
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
        children: [
            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'allSessions',
                element: <AllSessions></AllSessions>
            },
            {
                path: 'updateSession/:id',
                element: <UpdateSession></UpdateSession>
            },
            {
                path: 'allMaterials',
                element: <AllMaterials></AllMaterials>
            }
        ]
    },
    {
        path: 'payment',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
    }
])