import { motion } from 'framer-motion';
import cleaningImage1 from '../assets/image3.jpg';
import cleaningImage2 from '../assets/Cleaning.webp';

const ServiceCleaning = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-4 bg-gray-50 px-8">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          variants={fadeIn}
        >
          Our Premium Cleaning Services
        </motion.h2>
        <motion.p
          className="text-lg mt-4 text-gray-600 max-w-lg mx-auto"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.2 }}
          variants={fadeIn}
        >
          Experience a spotless and hygienic environment with our professional
          cleaning services. We ensure quality, reliability, and customer
          satisfaction every step of the way.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {/* Left Image */}
          <motion.div
            className="rounded-lg overflow-hidden shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            variants={slideInLeft}
          >
            <img
              src={cleaningImage1}
              alt="Cleaning Service 1"
              className="w-full h-72 object-cover bg-center"
            />
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="rounded-lg overflow-hidden shadow-lg bg-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            variants={slideInRight}
          >
            <img
              src={cleaningImage2}
              alt="Cleaning Service 2"
              className="w-full h-72 object-cover bg-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCleaning;
