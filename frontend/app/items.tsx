"use client";

import useItems from "@/hooks/use-items";

const BeetItemList = () => {
const { items } = useItems();

  return (
    <table className="max-w-lg mx-auto">
      <tbody>
        {items.map(({ id, title, bpm }) => (
          <tr key={id} className="">
            <td>{title}</td>
            <td>{bpm}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BeetItemList;