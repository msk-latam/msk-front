import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RootPage() {
  const country = cookies().get('country')?.value || 'ar';
  redirect(`/${country}/home`);
}
