const validateRegister = (name: string, value: string): string | null => {
  const validations: Record<string, (value: string) => string | null> = {
    name: (value) => {
      if (!value) return "Name is required";
      if (value.length < 3 || value.length > 50)
        return "Name must be between 3 and 50 characters";
      return null;
    },
    phone: (value) => {
      if (!value) return "Phone is required";
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(value)) return "Invalid phone format";
      return null;
    },
    address: (value) => {
      if (!value) return "Address is required";
      if (value.length < 3 || value.length > 80)
        return "Address must be between 3 and 80 characters";
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
      if (value.length < 8 || value.length > 15)
        errors.push("Password must be between 8 and 15 characters");
      if (!/[a-z]/.test(value)) errors.push("One lowercase letter");
      if (!/[A-Z]/.test(value)) errors.push("One uppercase letter");
      if (!/[0-9]/.test(value)) errors.push("One number");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        errors.push("One special character");
      return errors.length ? errors.join(", ") : null;
    },
    city: (value) => {
      if (!value) return "City is required";
      if (value.length < 5 || value.length > 20)
        return "City must be between 5 and 20 characters";
      return null;
    },
    height: (value) => {
      const height = parseFloat(value);
      if (!value) return "Height is required";
      if (isNaN(height) || height < 50 || height > 250)
        return "Height must be a number between 50 and 250";
      return null;
    },
    weight: (value) => {
      const weight = parseFloat(value);
      if (!value) return "Weight is required";
      if (isNaN(weight) || weight < 50 || weight > 250)
        return "Weight must be a number between 50 and 250";
      return null;
    },
  };

  return validations[name] ? validations[name](value) : null;
};

export default validateRegister;
