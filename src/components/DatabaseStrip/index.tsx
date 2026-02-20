import { motion } from "framer-motion";
import clickhouseImg from "@/assets/clickhouse.webp";
import postgresImg from "@/assets/postgres.webp";
import mysqlImg from "@/assets/mysql.webp";
import sqliteImg from "@/assets/sqlite.webp";

const databases = [
  { name: "ClickHouse", src: clickhouseImg },
  { name: "PostgreSQL", src: postgresImg },
  { name: "MySQL", src: mysqlImg },
  { name: "SQLite", src: sqliteImg },
];

const DatabaseStrip = () => {
  return (
    <section className="bg-background  py-12">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Supported Engines
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {databases.map((db, i) => (
            <motion.div
              key={db.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <img src={db.src} alt={db.name} className="h-8 w-8 object-contain" />
              <span className="font-mono text-sm font-medium text-foreground">{db.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DatabaseStrip;
