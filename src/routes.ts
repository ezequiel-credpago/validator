import {EventsController} from "./controller/EventsController";
import Auth from "./middleware/Auth";

export const Routes = [
    {
        method: "post",
        route: "/event",
        controller: EventsController,
        action: "save",
        middleware: [Auth.isAuthenticated]
    },
    {
        method: "get",
        route: "/events",
        controller: EventsController,
        action: "all",
        middleware: [Auth.isAuthenticated]
    },
    {
        method: "get",
        route: "/event/:id",
        controller: EventsController,
        action: "one",
        middleware: [Auth.isAuthenticated]
    }
];