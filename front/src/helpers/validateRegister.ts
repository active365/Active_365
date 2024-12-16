const validateRegister = (name: string, value: string): string | null => {
  const validations: Record<string, (value: string) => string | null> = {
    name: (value) => {
      if (!value) return "Name is required";
      return null;
    },
    phone: (value) => {
      if (!value) return "Phone is required";
      const phoneRegex = /^[0-9]{10,15}$/; // Valida entre 10-15 dígitos
      if (!phoneRegex.test(value)) return "Invalid phone format";
      return null;
    },
    address: (value) => {
      if (!value) return "Address is required";
      return null;
    },
    email: (value) => {
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid email format";
      return null;
    },
    password: (value) => {
      if (!value) return "Password is required";
      const errors = [];
      if (value.length < 6) errors.push("At least 6 characters");
      if (!/[A-Z]/.test(value)) errors.push("One uppercase letter");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        errors.push("One special character");
      return errors.length ? errors.join(", ") : null;
    },
  };

  return validations[name] ? validations[name](value) : null;
};

export default validateRegister;
