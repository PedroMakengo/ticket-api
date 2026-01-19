import dayjs from 'dayjs';
import 'dayjs/locale/pt';

dayjs.locale('pt');

export function formatEventoData(data: Date | string) {
  return dayjs(data).format('dddd, DD/MM/YYYY');
}
