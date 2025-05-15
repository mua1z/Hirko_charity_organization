import React from "react";

const Home = () => {
  return (
    <div className="text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <h1 className="text-2xl font-bold text-green-600">Hirko Charity</h1>
          <nav className="space-x-4">
            <a href="#home" className="text-gray-700 hover:text-green-600">Home</a>
            <a href="#about" className="text-gray-700 hover:text-green-600">About</a>
            <a href="#programs" className="text-gray-700 hover:text-green-600">Programs</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600">Contact</a>
            <a href="#donate" className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">Donate</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="py-20 text-center bg-green-100">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-green-700">Empowering Communities. Changing Lives.</h2>
          <p className="mb-6 text-lg text-gray-700">
            Hirko Charity Organization is dedicated to improving lives through education,
            healthcare, and community support in Ethiopia.
          </p>
          <a
            href="#donate"
            className="px-6 py-3 text-lg text-white bg-green-600 rounded-full hover:bg-green-700"
          >
            Make a Difference
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h3 className="mb-6 text-3xl font-bold text-green-700">About Us</h3>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Hirko is a nonprofit organization focused on creating sustainable change in vulnerable
            communities by addressing critical needs such as education access, healthcare, and
            women's empowerment. We believe in long-term impact through local partnerships.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h3 className="mb-10 text-3xl font-bold text-center text-green-700">Our Programs</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded shadow">
              <h4 className="mb-2 text-xl font-semibold text-green-600">Education</h4>
              <p className="text-gray-600">
                Providing school supplies, scholarships, and community learning centers for youth and adults.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h4 className="mb-2 text-xl font-semibold text-green-600">Healthcare</h4>
              <p className="text-gray-600">
                Free medical camps, maternal health programs, and access to clean water and sanitation.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h4 className="mb-2 text-xl font-semibold text-green-600">Women Empowerment</h4>
              <p className="text-gray-600">
                Vocational training and financial literacy programs to uplift and empower women in rural areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="donate" className="py-20 text-center text-white bg-green-600">
        <div className="container px-4 mx-auto">
          <h3 className="mb-4 text-3xl font-bold">Join Us in Making a Difference</h3>
          <p className="mb-6 text-lg">
            Your donation can help transform lives and bring hope to entire communities.
          </p>
          <a href="#contact" className="px-6 py-3 text-lg text-green-600 bg-white rounded-full hover:bg-gray-100">
            Get Involved
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-10 text-white bg-gray-900">
        <div className="container px-4 mx-auto text-center">
          <p className="mb-2 text-lg font-semibold">Hirko Charity Organization</p>
          <p className="text-sm">Email: contact@hirkocharity.org | Phone: +251 912 345 678</p>
          <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Hirko Charity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
