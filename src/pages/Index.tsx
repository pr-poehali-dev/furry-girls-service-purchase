import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Performer {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image: string;
  specialty: string;
}

const performers: Performer[] = [
  {
    id: 1,
    name: 'Кристал',
    description: 'Профессиональный аниматор для фотосессий',
    price: '5000 ₽',
    duration: '2 часа',
    category: 'photo',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
    specialty: 'Фотосессии',
  },
  {
    id: 2,
    name: 'Луна',
    description: 'Ведущая мероприятий в образе',
    price: '8000 ₽',
    duration: '3 часа',
    category: 'event',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
    specialty: 'Мероприятия',
  },
  {
    id: 3,
    name: 'Роза',
    description: 'Актриса для видеопоздравлений',
    price: '3000 ₽',
    duration: '1 час',
    category: 'video',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
    specialty: 'Видео',
  },
  {
    id: 4,
    name: 'Аврора',
    description: 'Компаньон для встреч',
    price: '4000 ₽',
    duration: '2 часа',
    category: 'meet',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
    specialty: 'Встречи',
  },
  {
    id: 5,
    name: 'Стелла',
    description: 'Онлайн видеозвонки',
    price: '2000 ₽',
    duration: '30 минут',
    category: 'online',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
    specialty: 'Онлайн',
  },
  {
    id: 6,
    name: 'Нова',
    description: 'Стримы и онлайн-ивенты',
    price: '6000 ₽',
    duration: '2 часа',
    category: 'online',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
    specialty: 'Стримы',
  },
];

const galleryImages = [
  'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
  'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
  'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
  'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
  'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
  'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
];

const timeSlots = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPerformer, setSelectedPerformer] = useState<Performer | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { toast } = useToast();

  const filteredPerformers = selectedCategory === 'all' 
    ? performers 
    : performers.filter(s => s.category === selectedCategory);

  const handleBooking = (performer: Performer) => {
    setSelectedPerformer(performer);
    setBookingOpen(true);
  };

  const submitBooking = () => {
    if (!date || !selectedTime) {
      toast({
        title: 'Ошибка',
        description: 'Выберите дату и время',
        variant: 'destructive',
      });
      return;
    }

    setBookingOpen(false);
    setPaymentOpen(true);
  };

  const submitPayment = () => {
    toast({
      title: '✨ Оплата успешна!',
      description: `Бронирование ${selectedPerformer?.name} подтверждено на ${date?.toLocaleDateString('ru-RU')} в ${selectedTime}`,
    });
    setPaymentOpen(false);
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-black/90 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">🦊</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                FurryElite
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#performers" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Актёры</a>
              <a href="#gallery" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Галерея</a>
              <a href="#contacts" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Calendar" className="mr-2 h-4 w-4" />
              Заказать
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-6 py-2 border-0">
              ✨ Премиум сервис
            </Badge>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            FurryElite
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Закажите профессионального фурри-аниматора для любого мероприятия. Фотосессии, праздники, онлайн-ивенты.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg border-0">
              <Icon name="Sparkles" className="mr-2 h-5 w-5" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="text-lg border-2 border-primary hover:bg-primary/10">
              <Icon name="Info" className="mr-2 h-5 w-5" />
              О сервисе
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Наши актёры
            </h2>
            <p className="text-muted-foreground text-lg">Выберите специалиста для вашего мероприятия</p>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 md:grid-cols-6 mb-8 h-auto gap-2 bg-card">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                Все
              </TabsTrigger>
              <TabsTrigger value="photo" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                Фото
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                Видео
              </TabsTrigger>
              <TabsTrigger value="event" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                Ивенты
              </TabsTrigger>
              <TabsTrigger value="meet" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                Встречи
              </TabsTrigger>
              <TabsTrigger value="online" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                Онлайн
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPerformers.map((performer) => (
                  <Card key={performer.id} className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 border-2 border-border hover:border-primary bg-card">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={performer.image} 
                        alt={performer.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1">{performer.name}</h3>
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                          {performer.specialty}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-black/70 text-white border border-primary backdrop-blur-sm">
                          {performer.price}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardDescription className="text-base text-muted-foreground">{performer.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Clock" className="h-4 w-4" />
                        <span>{performer.duration}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-0"
                        onClick={() => handleBooking(performer)}
                      >
                        <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                        Заказать
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Галерея
            </h2>
            <p className="text-muted-foreground text-lg">Наши работы</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer border-2 border-border hover:border-primary transition-all">
                <img 
                  src={img} 
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Icon name="ZoomIn" className="h-6 w-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Контакты
            </h2>
            <p className="text-muted-foreground text-lg">Свяжитесь с нами любым удобным способом</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl">Напишите нам</CardTitle>
                <CardDescription>Ответим в течение часа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Input id="message" placeholder="Ваше сообщение" className="bg-input border-border" />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-0">
                  <Icon name="Send" className="mr-2 h-4 w-4" />
                  Отправить
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2 border-border hover:border-primary transition-colors bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-muted-foreground">info@furryelite.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-primary transition-colors bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-primary transition-colors bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telegram</h3>
                      <p className="text-muted-foreground">@furryelite</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-black border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-lg text-muted-foreground">© 2024 FurryElite. Все права защищены.</p>
        </div>
      </footer>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Заказ: {selectedPerformer?.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedPerformer?.description} • {selectedPerformer?.price}
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div>
              <Label className="text-base mb-4 block">Выберите дату</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-border bg-card"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div>
              <Label className="text-base mb-4 block">Выберите время</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={selectedTime === time ? "bg-gradient-to-r from-primary to-secondary border-0" : "border-border"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="booking-name">Ваше имя</Label>
                  <Input id="booking-name" placeholder="Как к вам обращаться?" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-contact">Контакт (телефон или email)</Label>
                  <Input id="booking-contact" placeholder="+7 (999) 123-45-67" className="bg-input border-border" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingOpen(false)} className="border-border">
              Отмена
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-0"
              onClick={submitBooking}
            >
              <Icon name="CreditCard" className="mr-2 h-4 w-4" />
              К оплате
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оплата заказа</DialogTitle>
            <DialogDescription className="text-base">
              {selectedPerformer?.name} • {selectedPerformer?.price}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="p-4 rounded-lg border-2 border-primary/50 bg-primary/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Услуга:</span>
                <span className="font-semibold">{selectedPerformer?.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Дата и время:</span>
                <span className="font-semibold">{date?.toLocaleDateString('ru-RU')} в {selectedTime}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-lg font-bold">Итого:</span>
                <span className="text-2xl font-bold text-primary">{selectedPerformer?.price}</span>
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
                  <Input id="card-number" placeholder="0000 0000 0000 0000" className="bg-input border-border" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Срок</Label>
                    <Input id="expiry" placeholder="MM/YY" className="bg-input border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="000" type="password" className="bg-input border-border" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentOpen(false)} className="border-border">
              Отмена
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 border-0"
              onClick={submitPayment}
            >
              <Icon name="Check" className="mr-2 h-4 w-4" />
              Оплатить {selectedPerformer?.price}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
