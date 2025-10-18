import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Performer {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}

const performers: Performer[] = [
  {
    id: 1,
    name: 'Кристал',
    description: 'Профессиональный аниматор для фотосессий',
    price: 5000,
    duration: '2 часа',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
  },
  {
    id: 2,
    name: 'Луна',
    description: 'Ведущая мероприятий в образе',
    price: 8000,
    duration: '3 часа',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
  },
  {
    id: 3,
    name: 'Роза',
    description: 'Актриса для видеопоздравлений',
    price: 3000,
    duration: '1 час',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
  },
  {
    id: 4,
    name: 'Аврора',
    description: 'Компаньон для встреч',
    price: 4000,
    duration: '2 часа',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
  },
  {
    id: 5,
    name: 'Стелла',
    description: 'Онлайн видеозвонки',
    price: 2000,
    duration: '30 минут',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
  },
  {
    id: 6,
    name: 'Нова',
    description: 'Стримы и онлайн-ивенты',
    price: 6000,
    duration: '2 часа',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
  },
];

export default function Index() {
  const [selectedPerformer, setSelectedPerformer] = useState<Performer | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const { toast } = useToast();

  const handleBooking = (performer: Performer) => {
    setSelectedPerformer(performer);
    setPaymentOpen(true);
  };

  const processPayment = async () => {
    if (!customerName || !customerEmail) {
      toast({
        title: 'Ошибка',
        description: 'Заполните имя и email',
        variant: 'destructive',
      });
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      toast({
        title: 'Ошибка',
        description: 'Заполните данные карты',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentOpen(false);
    
    toast({
      title: '✨ Оплата успешна!',
      description: `Заказ ${selectedPerformer?.name} оформлен. Подтверждение отправлено на ${customerEmail}`,
    });

    setCustomerName('');
    setCustomerEmail('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-black/90 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">🦊</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FurryElite
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Заказать фурри
            </h2>
            <p className="text-muted-foreground text-lg">Выберите специалиста для вашего мероприятия</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {performers.map((performer) => (
              <Card key={performer.id} className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 border-2 border-border hover:border-primary bg-card">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={performer.image} 
                    alt={performer.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-3xl font-bold text-white mb-2">{performer.name}</h3>
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 text-sm">
                      {performer.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white border border-primary backdrop-blur-sm text-lg px-4 py-2">
                      {performer.price.toLocaleString()} ₽
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardDescription className="text-base text-muted-foreground">{performer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Icon name="Clock" className="h-4 w-4" />
                    <span>Длительность: {performer.duration}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-0 text-lg py-6"
                    onClick={() => handleBooking(performer)}
                  >
                    <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                    Заказать за {performer.price.toLocaleString()} ₽
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
            <DialogDescription className="text-base">
              {selectedPerformer?.name} • {selectedPerformer?.duration}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="p-4 rounded-lg border-2 border-primary/50 bg-primary/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Услуга:</span>
                <span className="font-semibold">{selectedPerformer?.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Продолжительность:</span>
                <span className="font-semibold">{selectedPerformer?.duration}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                <span className="text-lg font-bold">Итого:</span>
                <span className="text-2xl font-bold text-primary">{selectedPerformer?.price.toLocaleString()} ₽</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Ваше имя</Label>
                <Input 
                  id="customer-name" 
                  placeholder="Иван Иванов" 
                  className="bg-input border-border"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-email">Email для подтверждения</Label>
                <Input 
                  id="customer-email" 
                  type="email"
                  placeholder="your@email.com" 
                  className="bg-input border-border"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base">Способ оплаты</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Icon name="CreditCard" className="h-5 w-5" />
                      <span>Банковская карта</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="sbp" id="sbp" />
                  <Label htmlFor="sbp" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Icon name="Smartphone" className="h-5 w-5" />
                      <span>СБП</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Icon name="Bitcoin" className="h-5 w-5" />
                      <span>Криптовалюта</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Номер карты</Label>
                  <Input 
                    id="card-number" 
                    placeholder="0000 0000 0000 0000" 
                    className="bg-input border-border"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Срок</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY" 
                      className="bg-input border-border"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="000" 
                      type="password" 
                      className="bg-input border-border"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'sbp' && (
              <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
                <Icon name="Smartphone" className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">
                  После нажатия кнопки откроется приложение банка для оплаты через СБП
                </p>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="p-4 bg-muted/50 rounded-lg border border-border text-center">
                <Icon name="Bitcoin" className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">
                  После нажатия кнопки вы получите адрес кошелька для оплаты
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPaymentOpen(false)} 
              className="border-border"
              disabled={isProcessing}
            >
              Отмена
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-0"
              onClick={processPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="Check" className="mr-2 h-4 w-4" />
                  Оплатить {selectedPerformer?.price.toLocaleString()} ₽
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
