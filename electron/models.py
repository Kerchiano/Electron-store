from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Categories(models.Model):
    slug = models.SlugField(max_length=255, blank=True, unique=True, db_index=True, verbose_name="URL")
    name = models.CharField(max_length=30)
    icon = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Brand(models.Model):
    slug = models.SlugField(max_length=255, blank=True, unique=False, db_index=True, verbose_name="URL")
    name = models.CharField(max_length=30)
    logo = models.ImageField(upload_to='images/', blank=True)
    category = models.ManyToManyField(Categories)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    slug = models.SlugField(max_length=255, blank=True, unique=False, db_index=True, verbose_name="URL")
    category = models.ForeignKey("Categories", on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True)
    image = models.ImageField(upload_to='images/', blank=True)

    class Meta:
        verbose_name_plural = 'subcategories'

    def __str__(self):
        return self.name


class Product(models.Model):
    sub_category = models.ForeignKey("SubCategory", on_delete=models.CASCADE, blank=True, null=True)
    brand = models.ForeignKey("Brand", on_delete=models.CASCADE, blank=True, null=True)
    slug = models.SlugField(max_length=255, blank=True, unique=True, db_index=True, verbose_name="URL")
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=255)
    price = models.IntegerField()
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    postOfficeAddress = models.TextField()
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=100)
    amount = models.CharField(max_length=100)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.user_id)


class OrderItem(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/')
    price = models.CharField(max_length=50)
    quantity = models.CharField(max_length=20)
    total = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.order.user_id)

# class OrderItem(models.Model):
#     order = models.ForeignKey(Order, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
#     quantity = models.CharField(max_length=20)
