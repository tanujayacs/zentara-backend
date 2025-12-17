interface AvatarProps {
  name: string;
}

export default function Avatar({ name }: AvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold">
      {getInitials(name)}
    </div>
  );
}