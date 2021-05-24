import 'reactn';
import { TUser } from "@types";

declare module 'reactn/default' {
	export interface Reducers {
		signOut: (global: State, dispatch: Dispatch, args: void) => null // Pick<State, 'value'>;
		signIn: (global: State, dispatch: Dispatch, args: any) => null // Pick<State, 'value'>;
	}

	export interface State {
		token?: string,
		user?: TUser
	}
}
