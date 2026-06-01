import { ProductRegistrationFlow } from "@/features/product-registration/ui/ProductRegistrationFlow";
import * as styles from './page.css';

export default function SellPage() {
  return (
    <main className={styles.page}>
      <ProductRegistrationFlow />
    </main>
  );
}