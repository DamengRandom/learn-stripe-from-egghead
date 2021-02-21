import Head from 'next/head';
import Link from "next/link";
import styles from '../styles/Home.module.css';
import products from "../products.json";
import { useCart } from "../hooks/use-cart";

export default function Home() {
  const {
    subTotal,
    numberOfItems,
    addToCart,
    checkout,
  } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Space Jelly Shop
        </h1>

        <p className={styles.description}>
          The best space Jellyfish swag in the universe!
        </p>

        <div>
          <p><strong>Items: </strong>{numberOfItems}</p>
          <p><strong>Total Costs: </strong>${subTotal}</p>
          <button
            className={styles.button}
            onClick={checkout}
          >
            Checkout
          </button>
        </div>

        <ul className={styles.grid}>
          {products.map(({id, title, description, image, price}) => (
            <li key={id} className={styles.card}>
              <Link href={`/products/${id}`}>
                <a>
                  <img src={image} alt={title} />
                  <h3>{title}</h3>
                  <p>${price}</p>
                  <p>{description}</p>
                </a>
              </Link>
              <div>
                <button className={styles.button}
                  onClick={() => {
                    addToCart({id});
                  }}>Add To Cart</button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
