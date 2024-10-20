import { AppwriteException } from "appwrite";

export const errorResponse = (error: unknown) => {
	const type = "error";
	let title = "Erro";
	let message = "Algo deu errado. Por favor, tente novamente mais tarde.";
	let button: string = "Continuar";

	if (error instanceof AppwriteException) {
		title = `Código do erro: ${error.code}`;
		message = `Mensagem do erro: ${error.message}`;
	} else if (error instanceof Error) {
		if (error.message.includes("Invalid credentials")) {
			title = "Dados inválidos!";
			message = "Verifique seu email e senha.";
		} else if (error.message.includes("A user with the same id")) {
			title = "Usuário já existe";
			message = "Já existe uma conta com este email.";
		} else if (error.message.includes("User with the requested ID")) {
			title = "Erro na ativação:";
			message = "Cadastre-se ou tente fazer o login.";
		} else if (error.message.includes("Invalid token")) {
			title = "Link inválido ou expirado:";
			message = "Por favor, solicite um novo link.";
		} else if (error.message.includes("Rate limit for the current endpoint has been exceeded") || error.message.includes("Too many login attempts")) {
			title = "Servidor em manutenção!";
			message = "Tente novamente em 1 (uma) hora.";
		} else {
			title = "Erro desconhecido";
			message = error.message; // Exibe a mensagem do erro desconhecido
		}
	} else if (typeof error === "string") {
		// Lida com mensagens de erro simples (strings)
		message = error;
	} else {
		console.error("Erro inesperado:", error);
	}

	// Log detalhado do erro
	console.log("Error response generated:", { type, title, message, button });

	return { type, title, message, button };
};
