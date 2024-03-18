
import React from "react";
import about from '../assets/about.png'

function About() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white text-center overflow-hidden">
      <img
        src={about}
        alt="about"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto">
        <div className="container mx-auto p-8 max-w-4xl overflow-y-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            About Nyaribo Pharmacy
          </h1>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">Objective</h2>
            <p className="text-sm md:text-base lg:text-lg mb-4 leading-relaxed">
            Our mission encompasses ensuring the accuracy and efficiency of medication dispensing, offering personalized counseling to empower patients in managing their health, and upholding stringent standards of quality and safety at every step. Through continuous improvement, technological innovation, and a commitment to excellence, we aim to deliver exceptional care that exceeds expectations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">Mission Statement</h2>
            <p className="text-sm md:text-base lg:text-lg mb-4 leading-relaxed">
            Our mission at Nyaribo pharmacy is to provide accessible and compassionate healthcare services to our community. We strive to enhance the well-being of every
             individual by offering high-quality medications, personalized 
             consultations, and educational resources. Our dedicated team of pharmacists is committed to ensuring that every patient receives the care 
             and support they need to manage their health effectively. 
             Through innovation, integrity, and empathy, we aim to be a trusted partner in promoting healthier lives and fostering a stronger, more vibrant community."
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-xl lg:text-2xl font-bold mb-3">Nyaribo Pharmacy Policies</h2>

            <PolicyItem
              title="Zero Tolerance for Discrimination"
              description="
              Our pharmacy's policy prioritizes integrity, compassion, and excellence, ensuring adherence to regulatory standards, fostering trust through transparency, and striving for continuous improvement to deliver exceptional care and promote wellness. is dedicated to providing an inclusive and diverse environment where all students are treated with respect and dignity, regardless of race, gender, religion, sexual orientation, or nationality."
            />

            <PolicyItem
              title="Open Hours Policy"
              description="
              Our open hours policy ensures that our pharmacy is accessible to customers during convenient and consistent hours of operation, promoting accessibility and reliability in service delivery."
            />

            <PolicyItem
              title="Service Policy"
              description="
              Our service policy is dedicated to providing exceptional and personalized care to every customer, ensuring prompt assistance, accurate information, and a welcoming atmosphere to meet their healthcare needs effectively and with compassion"
            />


          </section>
        </div>
      </div>
    </div>
  );
}

// A separate component for each policy item
const PolicyItem = ({ title, description }) => (
  <div className="mb-6">
    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">{title}</h3>
    <p className="text-sm md:text-base lg:text-lg leading-relaxed">{description}</p>
  </div>
);

export default About;




