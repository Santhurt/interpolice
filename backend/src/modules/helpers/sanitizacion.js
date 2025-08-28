import validator from "validator";

export function santizarTexto(texto) {
    return validator.escape(validator.trim(texto));
}
