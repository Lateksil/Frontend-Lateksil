import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';

const StatusOrderTransaction = ({ status }) => {
  switch (status) {
    case TransactionTypes.WAITING:
      return {
        color: 'orange',
        text: 'Menunggu',
        color_ket: 'orange.600',
        text_ket: `Sedang Menunggu Persetujuan, Mohon ditunggu`,
      };
    case TransactionTypes.ACCEPT:
      return {
        color: 'green',
        text: 'DiTerima',
        color_ket: 'green.600',
        text_ket: `Dimohon Pelanggan untuk segera membayar untuk
        melanjutkan proses`,
      };
    case TransactionTypes.IN_PROGRESS:
      return {
        color: 'pink',
        text: 'In Progress',
        color_ket: 'pink.600',
        text_ket: `Kami sedang Mengerjakan Pesanan kamu, Mohon untuk
        menunggu sampai proses selesai`,
      };
    case TransactionTypes.DONE:
      return { color: 'green', text: 'Selesai' };
    case TransactionTypes.CANCELED:
      return { color: 'red', text: 'Batal' };
    default:
      return { color: 'gray', text: 'Error' };
  }
};

export default StatusOrderTransaction;
