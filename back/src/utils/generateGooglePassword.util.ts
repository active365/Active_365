export function reverseAndMixEmail(email: string): string {
    // Validar si es un correo válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('El formato del correo no es válido.');
    }

    // Paso 1: Invertir el correo
    const reversedEmail = email.split('').reverse().join('');

    // Paso 2: Mezclar de forma predecible (algoritmo basado en índices)
    const mixAlgorithm = (str: string): string => {
        const indices = [3, 1, 4, 0, 2]; // Ejemplo de patrón de mezcla (puedes ajustar este patrón)
        let result = '';

        for (let i = 0; i < str.length; i++) {
            const index = indices[i % indices.length]; // Repetir el patrón si es más corto que la cadena
            result += str[(i + index) % str.length]; // Seleccionar índice dentro de los límites
        }

        return result;
    };

    // Aplicar la mezcla
    const mixedEmail = mixAlgorithm(reversedEmail);

    return mixedEmail;
}