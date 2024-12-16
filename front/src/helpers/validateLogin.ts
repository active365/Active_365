const validateLogin = (name: string, value: string): string | null => {
    const validations: Record<string, (value: string) => string | null> = {
      email: (value) => {
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format";
        return null;
      },
  
      password: (value) => {
        if (!value) return "Password is required";
        return null;
      },
    };
  
    return validations[name] ? validations[name](value) : null;
  };
  
  export default validateLogin;