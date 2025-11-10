import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gigil-teal mb-6">
          Find the Perfect Gift
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Take our quick quiz and discover personalized gift recommendations
          tailored to your recipient's interests, your budget, and the occasion.
        </p>
        <Link
          href="/gifting"
          className="inline-block bg-gigil-teal hover:bg-opacity-90 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Start the Gifting Quiz →
        </Link>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-gigil-peach to-white rounded-2xl p-12 shadow-sm">
        <h2 className="text-3xl font-bold text-gigil-teal text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl font-bold text-gigil-teal">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Answer Questions</h3>
            <p className="text-gray-600">
              Tell us about the recipient, your budget, and their interests
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl font-bold text-gigil-teal">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Get Matched</h3>
            <p className="text-gray-600">
              Our algorithm finds the best gift matches from our curated collection
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-2xl font-bold text-gigil-teal">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Choose & Gift</h3>
            <p className="text-gray-600">
              Browse your personalized recommendations and find the perfect gift
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-gigil-teal text-center mb-12">
          Why Gigil?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-semibold text-xl mb-2 text-gigil-teal">
              Personalized Recommendations
            </h3>
            <p className="text-gray-600">
              Our smart quiz algorithm considers recipient type, budget, interests,
              and occasion to find gifts they'll truly love.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-semibold text-xl mb-2 text-gigil-teal">
              Quick & Easy
            </h3>
            <p className="text-gray-600">
              No more endless browsing. Answer a few questions and get curated
              suggestions in seconds.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🎁</div>
            <h3 className="font-semibold text-xl mb-2 text-gigil-teal">
              Curated Collection
            </h3>
            <p className="text-gray-600">
              Every gift in our database is handpicked to ensure quality and
              thoughtfulness for any occasion.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">📖</div>
            <h3 className="font-semibold text-xl mb-2 text-gigil-teal">
              Gifting Inspiration
            </h3>
            <p className="text-gray-600">
              Explore our <Link href="/blog" className="text-gigil-teal underline">blog</Link> for
              gifting tips, trends, and ideas for every occasion.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gigil-teal text-white rounded-2xl p-12 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find the Perfect Gift?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of thoughtful gift-givers who've discovered the joy of stress-free gifting
        </p>
        <Link
          href="/gifting"
          className="inline-block bg-white text-gigil-teal hover:bg-opacity-90 font-semibold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105"
        >
          Take the Quiz Now
        </Link>
      </section>
    </div>
  );
}
