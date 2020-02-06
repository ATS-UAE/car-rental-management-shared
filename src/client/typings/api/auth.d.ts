import { User } from ".";

interface Auth extends Omit<User, "clientId"> {
	clientId: number;
}
