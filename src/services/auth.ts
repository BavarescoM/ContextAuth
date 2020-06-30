interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'batatadoce',
        user: {
          name: 'Mauricio',
          email: 'mauricio.bavaresco@unohcapeco.edu.br',
        },
      });
    }, 2000);
  });
}
