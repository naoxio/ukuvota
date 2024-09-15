import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import QRCode from 'qrcode';

interface Props {
  text: string;
}

export default component$((props: Props) => {
  const { text } = props;
  const qrCode = useSignal<string | null>(null);

  useTask$(async ({ track }) => {
    track(() => text);
    try {
      const qr = await QRCode.toDataURL(text);
      qrCode.value = qr;
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  });

  return qrCode.value ? <img src={qrCode.value} alt="QR Code" /> : null;
});