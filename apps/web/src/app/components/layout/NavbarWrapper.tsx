import { getProgramTree } from '@/lib/programs';
import { Navbar } from './Navbar';

export async function NavbarWrapper() {
  const tree = await getProgramTree();
  return <Navbar programTree={tree as any} />;
}