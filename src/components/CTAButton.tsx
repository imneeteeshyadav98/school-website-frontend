type CTAButtonProps = {
    text: string;
    link: string;
  };
  
  export default function CTAButton({ text, link }: CTAButtonProps) {
    return (
      <div className="text-center">
        <a
          href={link}
          className="inline-block mt-10 px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition duration-300"
          aria-label="Call to Action"
        >
          {text}
        </a>
      </div>
    );
  }
  