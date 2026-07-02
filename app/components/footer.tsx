import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <footer>
      <Card className="rounded-none">
        <CardContent className="py-6 px-5">
          <p className="text-sm text-gray-400">
            &copy; 2023 Copyright{" "}
            <span className="font-semibold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
};

export default Footer;
