import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDate(date) {
  const genDate = new Date(date);

  return format(genDate, "dd/MM/yyyy");
};

export function formartDay(date){
    const genDate = new Date(date);
    const day =  format(genDate, "eeee", { locale: ptBR });
    
    return capitalizeWord(day)
};

export function capitalizeWord(word){
    return word[0].toUpperCase() + word.slice(1, word.length)
}

export function formatMoney(value) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};
