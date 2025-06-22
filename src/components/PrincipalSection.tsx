'use client';

import { motion } from "framer-motion";

type PrincipalSectionProps = {
  principalName?: string;
  principalMessage?: string;
  principalPhoto?: string;
};

export default function PrincipalSection({
  principalName,
  principalMessage,
  principalPhoto,
}: PrincipalSectionProps) {
  if (!principalName && !principalMessage && !principalPhoto) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-4 py-16 space-y-10"
    >
      <h3 className="text-3xl font-bold text-center text-gray-800">
        From the Principal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {principalPhoto && (
          <figure className="text-center">
            <img
              src={principalPhoto}
              alt={`Photo of ${principalName || "Principal"}`}
              className="rounded-full shadow-lg object-cover w-56 h-56 md:w-64 md:h-64 mx-auto border-4 border-blue-100"
            />
            {principalName && (
              <figcaption className="mt-4">
                <p className="text-xl font-semibold text-gray-800">{principalName}</p>
                <p className="text-sm text-gray-500">Principal</p>
              </figcaption>
            )}
          </figure>
        )}

        {principalMessage && (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-5 text-gray-700"
          >
            <blockquote className="border-l-4 border-blue-500 pl-6 italic text-sm leading-relaxed">
              {principalMessage.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </blockquote>
          </motion.article>
        )}
      </div>
    </motion.section>
  );
}
