import { ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";

export const Navbar = ({ onSectionChange }: { onSectionChange: (section: string) => void }) => {
  const { items, removeFromCart } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleSectionClick = (section: string) => {
    onSectionChange(section);
    toast.success(`Showing ${section} section`);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">GreenThumb</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleSectionClick('plants')}>
              Plants
            </Button>
            <Button variant="ghost" onClick={() => handleSectionClick('flowers')}>
              Flowers
            </Button>
            <Button variant="ghost" onClick={() => handleSectionClick('trees')}>
              Trees
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="mb-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <button
              className="p-2 hover:bg-gray-100 rounded-full flex items-center justify-center"
              aria-label="Profile"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAbFBMVEUAAAD////u7u7t7e3w8PD8/Pz9/f3s7Ozz8/P4+Pjc3Nzo6OioqKjR0dHHx8egoKCQkJBBQUHBwcFaWlo1NTVwcHBISEji4uK4uLiGhoYgICCysrJVVVUJCQl7e3saGhqYmJgtLS0TExNjY2PhZuG7AAAWQElEQVR4nOVda5urrA4dFBS81V61l+m00///Hw+gQqJItXZm9nnefNnDTlWWQFiEED94I0yLQCXWlsRTHVuoc5aEp+T8JfsgjdBYCWWwFDt1jSqOdCFqdEFTIiH6JYe/bO8SYB16QiBc1zWlUKCaMZeOt2AiGkgJeQcm0MVWx0NVoljXlBjWaVVXaq8L0XVYZyrV6AQsxV0pdOgY1AX/B2BQhf81MOFQ96Ng6HvBqCEq2icR+ZcaqEu7WTgFTByGITAAoSoSWDIVDvVPGbguDIwO3oUn+eZ8zrLbrSxvq9XqfN7kiR3kgydYAxDaJ8gKe3S6ZA2AaKSzdajoLPl+qf+MFIzN6vp4XA7r+/309f0h5fvrdL+vD5fH43rbJFy+BzHtnhNKXfED9QzWjtLuhekS73pU81Ok63pUU9Ivmhfldr27f32Myvd9t96Wm8D0qAD1Pdyf3QOw1y+VjoasD6bphK2Jx0Og0ZmeAQeZ1skpjOTlummI5/L9tT7mcihxUEVXhZEuxkB7A2k2mNAFhnBKeXreToMB5ZBV8lo8nn8PjLNlCK3qx3wkjWzPFarUL7bMAIz8bZwfT69CUfJ1zNO3gNG2LaRRB0bbwbbCrQ5ZYQOm07Fk83KjWLnU0miLxtIim2yJHrTJ1GmvP54zY+HSdURV5KvLcihKDrecs1FmLDys2ejMpKmF2/EspWugpmSGR6PTTRlJ6/Wkjp/SDh+kSGv9zMztjgVr+pd+AqqLZQdQJ7DOgAmDUTpDnXRGokmOB0/V5OyY1fWmyBspik1dZ+Vx74G/vuaD4dGjLA7dO5YAfBTKfb8qkiSVKxvV+l37KpHjLq6SIrveR+HERDgq/JOsOeRkNfKGH6s85qLtIIF7CcB4mmf7ETg3odH8FpiQktzdKtciliMvgtc51zNy4petVBzdcDbqxyMVngQGjxk02XOki0PKY2ct9ol85dRyHB8YpaOyAZOryyzsUwnV2GTUMrFvzERaWGfNmlJnvxwltUophj3sdDmzztJJ642vk0UWdVYJ3lNZpajeDgfQrrbPg9d1JfwEoUryCR+Ng8BMmo1noW0S5J+IOi9HmA2efdhvhKDGP8E93hGO/BpSR4XIr8NOe0tFc53Ty+H0gMymM5Tng4F7KRNp8cNevwx6fTZy6vQTOEnLAUl9FJzOpTPzwHB67veJyy1xDrIZYNSwqlYDUpTF/CfBiKrsPXCtoPSXB6+AUXD6ne2YiPC9YMACTPS7mKS7zHbBhWAUOeqR70chZoMx3LQBA1gzBMNF0eOUl6Id1hqMZdQ8BPfsvCMQjPGANM/rqijiotfX1rWAYABr1k8A9hqy5s4Kw1KEdazeDfq0MNbbeRdJaQkS/xMU36nxM05nos1w8wQ5M6HrWjsv9NOpQAyg559ADICKGk9vO+X2YK5eY5pSTg4sOZfXy3q3Xq8fZdY5msyEivtlQ4J6zZ81Rk3AJ3QTscBUB4GJe10ZPIry3uxya/olXrajAUhYmg0M7iELARi3E7D/JCo7lc8J6GbNwSg3o3SFm6UgEIzLo0n7/d/gqeUPhAcMydefAzTvI5qUIyzf+0REfjBp7Vu1ZSnXnWfEPcurK3K7lZy+jTXTHpbTLeVeXzMJN08WoKdVQukomJCHK2Skb5TP8jUrWxdTbDHbVue4j90zyo2vGTNqbeY5La5+KEoudcqRpQ1sV5JGl5+R6bxZv4ZvzOD9P+fOXZTBLrzeiDHPgi6JdDW2jMSNc6yEZ1cvQpPa58q7Nyiawgd1sf3GmLdeDlHDyq0TArg4H1xH0qvHzYzkkRDnWkPPHowkEM0p4xyuQ/B6ovVyfCDfmGIAwG+mdyjEBjb4JSddz0A+NXWddhBWM3y0h5z0PGUBKLEEmsN7zdUTkN8MMACte8rNeA5f0KXq/BNDx7m2GNWuX2Of3M8kBHNgz6PJK0gF14VYSjTxDS8JH98FUGCCOVCkfNUKzdguAH74NuHLwFB6w1g8WxpqkTUTixwL6n1jMGAXgKcQzTGmU8AAX7O2kd22fsDPGEtowQw9IJRPMmNYdjkfaxk5gjgaNyuKdnvDvpfjw+XJ4J014zm41aHQ3tCocSa0v4T+CT7iCfPLtuKdNeu8rZomNz4WgYZs0fpKek9vr2PY10w7f0EjhAPTtNu0ujiwv4ysl0USxIl7Zj0pWc+bLemTvGXXo6AraBcIpaN2WOmnT/A1SwsNFsnfWdu/AtgXIJ1JnvnQR0S+Jd5jAHCWj2rAbK5kEp0ZcjO5Sobvj0dA5wAjJnAYtzxS716/gGTq7HDdTgFDU+Bg2PeXBwMw9Qujv6thzzgFCAzlwH+6S/hLYOCrPqX8SYRG8HLDSNOSUA8YOUrgWxXjfujRMRMK2Fdz6/MJ3WA2UxmZSzK1HhgZM5LFiMT+9Ctj4RMwjf2ySwBp9mJg4TNubQ0NqcOacbdDf6LsUnVX620NgDVTLcOBm0OZcmPN9NPtEsA5aaq/V5b3P7hpPPekGYliScPIlgcvGk2h7RMEeFclGSyAYr0aG6EzsgQI+KkiDjAB6pcrRw1nyCNygIE1S63dl1x7LjcDU0xNnoKZQ/ydwsEQcIEhG/vbo5gJJrdvYh8/B5M76jdLNk9ahsTWWt4LVyDQKBjCbcPcWxrjAmP8fbWrgnNk/wRMxACtOdIRMO4IjdzOgMegC5QNnREa+m6LbJkWfRu07kRPkIbrZizSV8HxSjNsIzQ61tx6Flo2ahvmkjOkowT/Uns8qCceYKIIeV8B7mme0D1dAJN0DTj8Zce2P5jjSpIY/vt9I727towaXsfTxVg+1PpCRPCt4XcoIpLZWTwnCIW+LsJ+M+PXsA1zSJ3rMLOloncv+OLxL+dlEXr8yXpKEbZpjgLofBEacnlhLpINMyF6lm9c1ZsnRxb6XLBad7ZNEwOdn2haN/yaTQKz2JhJczYBDLEGrZwMxj5iRSaBWTj/K3lMAQNemhcMGDN2BNyZGSWeMRMgF84bwIyMGSnWK1e7xszQmhFLTUrSt8Jua/aOliE9m9y3Zrpq1lm0VtuDAujkL/E8Izi2sykfzEHdMyicZ86O2s2UPWEgPgW8NYiQc0vlEz6cZwLIsRSdETf7tlg4cPQ5lwBvsGZX0qczvWDjxo9rqcaVgSVAMLIEEHY2LzhkRx6i+YZ55jYA44qepZW5YEfpU6LJc2PM15ROBFM56zdLamucPGDCyAzo04Y/BcNK0y1XmLd6wMTLwVSTWiaObI++suctYzlD5XKOO8HQ5eHAZOzwAgbDUvOuL3ijMxwuAbhdlT04hcdhxoK0lYh+fNBs+WwG8vMgbW4WabsNF1hnTwO29bbUNDNxzY6DQsY7o0u8WArmymLvgR+js/Eon2UXoj56TMt68vP2GM2EY1o8WeackctmHnhjl42O52Z5sm9DI8bOnEXUeMu2yQww4Uu7GUAC7g/3NTpqd9MulR8M2EAou1DNSQfoFnKAKw8mggkCw512NfOyZrDHcuYzTgNCb84rUtCpYEKweLqNgdE7BdS6y3YFh7FwkDWHjpZZZs8uKYWV8o0ZOasbinLk7d5LD0zLjGPTIfeSyJG2wi3/a8HQoa9Z6opZe+Y9ObdMsRsXSuyWhtVFaoOjMsb5kXB0HWbNICr+JroIDd74C0QXhTH0zqh4kXjBlsY2dfgnrCcDc/aImEGzLgj6JWbNZGP8ZWrXD8do+hznkjlsXm+aM+rPLsc56nt1RwI+2wvNbjOiM3b1r/2YSNcF73Vg+lTn9W3AawXBPD8NaC1uhnUYTHTrfqZjZLDuyTlNXr1I0HYFipB9foCuMnNhKTxgqFn77NORlnGe09SBQKx+7UjgSsw8dGo3a66hA0xXKRvdob1sAey1zD9m8DJwhlxTikeJZ8y0hM1MA9sKj5nOmqlQB5KYpU9JIkagzkSDERjxhXRcvEBqtolwxptF3RwwPPcCzFlOUIRG563QEXW5sUgr1j/h6IwSxOcdSTj7xOZBe40dkYCeTCAs62jtqUBRiZYBKCZvtoxPmRhZurQlG6OJFh3JTDS7HNwTxGiOLwFUNW3oe81HlwDWzbqrRfBKpgaezOpp9wSN9WlEM+A2NjdDNAiDMdx3rdYXr6SdAGTjuZgYyZlgbKTTJDCX/EUwAU0nU85rRbEVngrG2qlVQEfAUGoIgAohHDsOA8FEAzDqBMS0+SYDZNIFBnFoyKi53dsuUycYNYzDGwBjDEBvkDceENsyfeMgGbnYP488eyRy4sJJP/pblGM6mhozc0wpMA52npGW1XpmH6HySwMds7HL2gzaWDyoa38pJH3yts7XQVJEexeKn9Dt6rmeoEqRdVQcOWE2ghDFNdsN870OMghw7PK4q6mx7JbqxFxk21EWfd+u8F1CZIXxbnPoai5jZI7cXtfjZgCM6IbARKIZQN6mOrbgm/LhCEE7Xa7ngDmD16ayZgiGQt27wIR9MGo4p/Xqut3ZXYj79no751zQ/ln9eUTzD8A01/GkOK9Wt7Iss3NdJIE+/TxiGn8MDDdgpviaezpsr+V6O4xjt51vaoztPIb2BAyHOuRrBtZsngFofLayY1W3rCshd06Xp6IbrEon/6O4yoUZDW0Gt6E5wLr2gKSxZiU2AJFl2DywYCreZ9+cjXJ/fc5c3nRz2X1/PSRHwaydDfm9OqlIqv39437JqPXAOFYCjlPnIEjxqDcqOx30m4FTckMG4Ntt1gaIr7qhrlepttegEGITOsi6czafJ9lXmi2657vNeh1GewzAzZotnZnLzQhOd7BNItIfzxgMOn/ROMBe4Wa3UW72ImuW7VzdPnqyO6eqQ1Ab6t68Ljk4Ix7Xg8DBfUW9J/5eYM2vrGcor9CZNNs8qyKpYgqzm9A4rZLaveQpE8yhPWCsr+nM3URT/cqsNO9nMTpmMBhebcZdTPd9mW3yPFGS58XmfPNknblnKaz+eN4ZYVeaZwWuP2aaCAJuHcY3Yayp09dscvJMOMa4PlykHNbO9oOyL4TuCU8yAgmzu3faCKgzuZqURDbYriRCMKgzKesYKIk4W7aV0ZNdWbHuee6nqz/JzbymnMDceniDFvjN1H+E/klTjsT9olRgDtnW0fMsWtZvliDdqEdTVRrpBo5zKs5vbZZGdiXruMIYNwMezRjpenEAN4TZC4ZHyzK0jcnnQzwBM9HXbHcB9Bl5Dxg5hS+PmB2RQ+UHk0/bBSDWF5E9aZk3hMuMShMXPgrGpow4e8HYnbNVZFLcdFNK89P2h6+fY5ogX6qWzdPbCSbidnoz3WddtL2k1SFfMxfWnO0r4fE1L9gmmySf2ajnWcRgT1MgHfI1w93mtd1t7ueepcH5h7F8qFxNyEJ3DIDG1Paea3OweyyuGRwBqsfiACj9BSz6+CYYEDAOwFRxNA6gBWP7z20kQoPzX8HS5U8ZEE276Lo/i9BIDTl/VO7YGdHPpfNjkgEwNqoJxM4k/tiZCVFNP2vHoDSHdnstwxMze+xHTwN2+dVWJtjKxJuh7PPsR6Z9t9yV6eUoLxsNbNR5Ocg+39vVE3YVsOeOHT/yA3RsXA4J61toe+7oXov+dwEwN0MxmunQN0bekGZ2jmwrjhkASU3POaQceDmcAafR0Vi+8yB6VtyeLrDeLNd+9KwNoNxPiJ4tzKA49OOa+ebXBr+RFXbdRqZrfJ3F89OAwo6KHEec8+RNCYDnyDpH0409qHAPn0ecByDOYs/gmBlJBfrTsg9AhUGM3p4MzqgMjzZycMQ7pmDZLBac+F8iTUfTS2PKbZRuwYfJpwf+AkbsqmsF/AVi8ZHfF+WUmy8IgPMzd8IGXwkAfjPTCDaic9dMVCrKp5+u7Rflws0GrR3PWWuTPaxZg2H2PmfS0RmeL43Dfl3O3bFHcE5H2MHiP0AHjml2YGi8NAx7ibA28YG1pnsyFQw113xlLZjl0f5L5Mh0hUG0ROoFEwIwIC/ChbcJDn+Vkw0k0czFWqC98IBhOCm7PXb1tdJRGOINR+SWyJ7JCoMcvmgmtWCES6j1hm8TZQLJ30wxRu45EzbI5GMfO6vdTJog+bT2HhB78OyjVLo/HTFSPo8RvdmAnML9hR1npgYKsxVo59SPeS+nyiEBKeKv4ay0EzC0/xq+4+jiQvk+2vnitJmVQ4NBg/a9+e0lmUtOdtRe+dxULaBVD4tOYLxdlE9/BMxo9nkQnXj67fWlV46EjGWfd36lSrud/4gkPxPl5Bj5thb4zhlK5S8NXfZ3zNIj3zeGP3QYjn3oEG2Ps39g2A/lwSfkN4NEswHDk39q3Ddyyl/LPBeyN+T5eLc0jv8XPnRIyV+uYZzyaL6R9yzznPNDh/HfEv+B3Cv2/EOHwNRBFsrFXxPMntSIJIOZpKltxwCMq4naEuknav9rKWkvTNgwAKoW9k+zAqcLjl++Wx7VpKzAnnzNyT9DBNYgX/Mc1gwyaYt/hWWeNoszacsLBp/P+RP5zmBq0xEw7Zm7zgAEzYm/FowOYhP/Akn7vukgOtvNUERdm/fY7dAwplkL+/UtpqGUTdAe91Z05OvAemayX2xYnLxkqRxjFLA+Nml2YIbczH5Lg8d/jOaYzvuWhgcMD3nwJ/tMnezDQSajBWDk9PqHbXNNuTcr3ewPHf4hmms8NSeN50OHITxgHv/ZZlMpiVeIU5mNfrIFGzefmX41Vf4yWTFUN2c9zefBBxu04cjXgZnkAr/ObO4ZR1bYfOhwuq955At0ASt+mXUeauY8pvWObwOGIvnVFcE+F/TNYLiNnQl5fPu9gVOmInQfoHvT58Ep95wweasczjrF9CwwcePKtJtNvS+dosxzqkySX2ED14SH8HupXD09hF86DZGvGUZozBD2C9Gz98y90ecXywAohX4ztZAxDECXzBF6WZiXXGK+bHOOP8sS9JcuQOf4ZMsTOoPPnHFx/kE78JkJTscoyxuIZg+Mur78ofXn95WxYYV/8vPg6ihp6vje8mK5XxIiwqE/+WfBqFLhOvC/CMqjHqnwPDDhYNnsT6LTnOyu92+Ec9rXTZwcTMrgSKLzxNfc30/rFceO5QlBaH18k52+H+uYPH26tzT4NuAoax77YoMosjeEPKxXBe8SlrLeE2CTRLA0jTW3FW5Ghwk4xQfogC7ZLJx39nXCzBCYkKnhTdxs5CsnaT74HPb0Rrl1n3+enBDkVV9zH4wz8xzhnKb57YWtqXuZx+Zbcf9Gy0Tqk0tyJNLzrNXbJUvURXR2QpA5YIyvuVfh0ZZp885ooOl5f//69jp0P7+/7o+sMhX25J0Z+XB7ezLRGoAm+bTjWEk/5ZyvNExHpwEVq+vhsN7d7ycL6/P7dL/v1ofDdVXoY6VM9O45TDLHRw8FOkog+XSMIjS0OHVho+u+sNMEsURQZ61CXa/K4/F4lSL/KVfnOu/GuuMJ/VAYWPLpZvmaJ+TQYKBfgoQzzcTa3qaZ46YYp6bPogHx89zMD6aXEweFtHq/db6cm/08GIfuvwNmQTdzRmiAkjUAkLdGOAcRzofUclrkhHQlXhijWhN0PdaMbbJ4WmLTdR5L69X5bLJX17BmMGnq10ccL7pN/2cmTXgdZtSRYwEU4BeNuTDOmhHA69yZ52Rv03fp6f4H9ROnXt33gZMAAAAASUVORK5CYII="
                alt="Profile"
                className="w-7 h-7 rounded-full"

              />
            </button>
          </div>
        
        </div>
      </div>
    </nav>
  );
};
