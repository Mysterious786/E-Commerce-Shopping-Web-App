import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";
export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES)