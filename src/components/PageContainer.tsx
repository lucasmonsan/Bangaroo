import { FC } from "react"
import { motion } from "framer-motion"
import { container } from "../interfaces"

export const PageContainer: FC<container> = ({ className, children }) => (
  <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={`_z-1 _flex _ai-center _gap-sm _w-100 ${className}`}>
    {children}
  </motion.section>
)
