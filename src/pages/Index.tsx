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

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    name: 'Фотосессия',
    description: 'Профессиональная фотосессия в костюме',
    price: '5000 ₽',
    duration: '2 часа',
    category: 'photo',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
  },
  {
    id: 2,
    name: 'Мероприятие',
    description: 'Участие в вашем празднике или ивенте',
    price: '8000 ₽',
    duration: '3 часа',
    category: 'event',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
  },
  {
    id: 3,
    name: 'Видеопоздравление',
    description: 'Персональное видео в образе',
    price: '3000 ₽',
    duration: '1 час',
    category: 'video',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
  },
  {
    id: 4,
    name: 'Встреча и общение',
    description: 'Дружеская встреча в кафе или парке',
    price: '4000 ₽',
    duration: '2 часа',
    category: 'meet',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/c4dfe2ce-cbd6-4d40-92b0-0cea72331c8e.jpg',
  },
  {
    id: 5,
    name: 'Онлайн звонок',
    description: 'Видеозвонок в образе персонажа',
    price: '2000 ₽',
    duration: '30 минут',
    category: 'online',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/d1f0410f-d1be-42cc-aa74-209794b01ff4.jpg',
  },
  {
    id: 6,
    name: 'Стрим',
    description: 'Совместный стрим с вашим персонажем',
    price: '6000 ₽',
    duration: '2 часа',
    category: 'online',
    image: 'https://cdn.poehali.dev/projects/c64b2a4f-bb39-476f-8b2a-9020bc5cf1da/files/a568663a-af79-4cdc-8cdd-cde37accc12d.jpg',
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { toast } = useToast();

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const handleBooking = (service: Service) => {
    setSelectedService(service);
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

    toast({
      title: '🎉 Бронирование успешно!',
      description: `${selectedService?.name} забронирована на ${date.toLocaleDateString('ru-RU')} в ${selectedTime}`,
    });
    setBookingOpen(false);
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">🦊</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FurryWorld
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
              <a href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">Галерея</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Calendar" className="mr-2 h-4 w-4" />
              Забронировать
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-6 py-2">
              ✨ Добро пожаловать
            </Badge>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Яркий мир фурри
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Профессиональные услуги для незабываемых моментов. Фотосессии, мероприятия и многое другое!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg">
              <Icon name="Sparkles" className="mr-2 h-5 w-5" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="text-lg border-2 hover:border-primary">
              <Icon name="Info" className="mr-2 h-5 w-5" />
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Наши услуги
            </h2>
            <p className="text-muted-foreground text-lg">Выберите то, что подходит именно вам</p>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 md:grid-cols-6 mb-8 h-auto gap-2">
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
                {filteredServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-primary border-2 border-primary">
                          {service.price}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Clock" className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        onClick={() => handleBooking(service)}
                      >
                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                        Забронировать
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Галерея
            </h2>
            <p className="text-muted-foreground text-lg">Наши яркие моменты</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer">
                <img 
                  src={img} 
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Напишите нам</CardTitle>
                <CardDescription>Ответим в течение часа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Input id="message" placeholder="Ваше сообщение" />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Send" className="mr-2 h-4 w-4" />
                  Отправить
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-muted-foreground">info@furryworld.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
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

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <Icon name="MessageCircle" className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telegram</h3>
                      <p className="text-muted-foreground">@furryworld</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2024 FurryWorld. Все права защищены. 🦊✨</p>
        </div>
      </footer>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Бронирование: {selectedService?.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedService?.description} • {selectedService?.price}
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div>
              <Label className="text-base mb-4 block">Выберите дату</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
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
                    className={selectedTime === time ? "bg-gradient-to-r from-primary to-secondary" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="booking-name">Ваше имя</Label>
                  <Input id="booking-name" placeholder="Как к вам обращаться?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-contact">Контакт (телефон или email)</Label>
                  <Input id="booking-contact" placeholder="+7 (999) 123-45-67" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingOpen(false)}>
              Отмена
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              onClick={submitBooking}
            >
              <Icon name="Check" className="mr-2 h-4 w-4" />
              Подтвердить бронирование
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
