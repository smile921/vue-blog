# spring boot application 创建启动

## 使用 spring boot 常见代码

```java
@SpringBootApplication
public class BootApplication {
	public static void main(String[] args) {
		SpringApplication.run(BootApplication.class, args);
	}
}

// 或者这样
@SpringBootApplication
public class BootApplication {
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(BootApplication.class);
    app.setxxx( ... );
    app.run(args);
	}
}
```

总之就是先实例化 SpringApplication 再设置必要的扩展点参数，在 run

## SpringApplication 实例化

```java
@SpringBootApplication // 实际是一个复合注解

@Target({java.lang.annotation.ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(...)
public @interface SpringBootApplication ...

//
@SpringBootConfiguration 近似于 @Configuration
@EnableAutoConfiguration ...
```

下面看看 SpringApplication 的实例化过程

```java

	public static final String DEFAULT_WEB_CONTEXT_CLASS = "org.springframework.boot."
			+ "web.servlet.context.AnnotationConfigServletWebServerApplicationContext";

	private static final String[] WEB_ENVIRONMENT_CLASSES = { "javax.servlet.Servlet",
			"org.springframework.web.context.ConfigurableWebApplicationContext" };

	public static final String DEFAULT_REACTIVE_WEB_CONTEXT_CLASS = "org.springframework."
			+ "boot.web.reactive.context.AnnotationConfigReactiveWebServerApplicationContext";

	private static final String REACTIVE_WEB_ENVIRONMENT_CLASS = "org.springframework."
			+ "web.reactive.DispatcherHandler";

	private static final String MVC_WEB_ENVIRONMENT_CLASS = "org.springframework."
			+ "web.servlet.DispatcherServlet";

	private static final String JERSEY_WEB_ENVIRONMENT_CLASS = "org.glassfish.jersey.server.ResourceConfig";

public SpringApplication(Class<?>... primarySources) {
		this(null, primarySources);
	}
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
		this.resourceLoader = resourceLoader;
		Assert.notNull(primarySources, "PrimarySources must not be null");
		this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
		this.webApplicationType = deduceWebApplicationType();
		setInitializers((Collection) getSpringFactoriesInstances(
				ApplicationContextInitializer.class));
		setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
		this.mainApplicationClass = deduceMainApplicationClass();
	}

	private WebApplicationType deduceWebApplicationType() {
		if (ClassUtils.isPresent(REACTIVE_WEB_ENVIRONMENT_CLASS, null)
				&& !ClassUtils.isPresent(MVC_WEB_ENVIRONMENT_CLASS, null)
				&& !ClassUtils.isPresent(JERSEY_WEB_ENVIRONMENT_CLASS, null)) {
			return WebApplicationType.REACTIVE;
		}
		for (String className : WEB_ENVIRONMENT_CLASSES) {
			if (!ClassUtils.isPresent(className, null)) {
				return WebApplicationType.NONE;
			}
		}
		return WebApplicationType.SERVLET;
	}

	private Class<?> deduceMainApplicationClass() {
		try {
			StackTraceElement[] stackTrace = new RuntimeException().getStackTrace();
			for (StackTraceElement stackTraceElement : stackTrace) {
				if ("main".equals(stackTraceElement.getMethodName())) {
					return Class.forName(stackTraceElement.getClassName());
				}
			}
		}
		catch (ClassNotFoundException ex) {
			// Swallow and continue
		}
		return null;
	}
```

- 先检查是否包含 reactive 相关的 DispatcherHandler 不包含 servlet 和 glassfish 相关的 ResourceConfig，则是 reactive app
- 再检查是否是 servlet 环境的 app
- 加载设置 ApplicationContextInitializer
- 加载设置 ApplicationListener
- 通过 RuntimeException 的 stackTrace 查找启动主类

## SpringApplication run 的过程

Run the Spring application, creating and refreshing a new

```java
public ConfigurableApplicationContext run(String... args) {
		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		ConfigurableApplicationContext context = null;
		Collection<SpringBootExceptionReporter> exceptionReporters = new ArrayList<>();
		configureHeadlessProperty();
		SpringApplicationRunListeners listeners = getRunListeners(args);
		listeners.starting();
		try {
			ApplicationArguments applicationArguments = new DefaultApplicationArguments(
					args);
			ConfigurableEnvironment environment = prepareEnvironment(listeners,
					applicationArguments);
			configureIgnoreBeanInfo(environment);
			Banner printedBanner = printBanner(environment);
			context = createApplicationContext();
			exceptionReporters = getSpringFactoriesInstances(
					SpringBootExceptionReporter.class,
					new Class[] { ConfigurableApplicationContext.class }, context);
			prepareContext(context, environment, listeners, applicationArguments,
					printedBanner);
			refreshContext(context);
			afterRefresh(context, applicationArguments);
			stopWatch.stop();
			if (this.logStartupInfo) {
				new StartupInfoLogger(this.mainApplicationClass)
						.logStarted(getApplicationLog(), stopWatch);
			}
			listeners.started(context);
			callRunners(context, applicationArguments);
		}
		catch (Throwable ex) {
			handleRunFailure(context, ex, exceptionReporters, listeners);
			throw new IllegalStateException(ex);
		}

		try {
			listeners.running(context);
		}
		catch (Throwable ex) {
			handleRunFailure(context, ex, exceptionReporters, null);
			throw new IllegalStateException(ex);
		}
		return context;
	}
```

- configureHeadlessProperty
- SpringApplicationRunListeners listeners.starting
- prepareEnvironment
- configureIgnoreBeanInfo
- printBanner
- createApplicationContext
- prepareContext
  - setEnvironment
  - postProcessApplicationContext
  - initializer.initialize
  - listener.contextPrepared
  - load sources
  - listeners.contextLoaded
- refreshContext
  - // Prepare this context for refreshing.
    prepareRefresh();
  - // Tell the subclass to refresh the internal bean factory.
    ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
  - // Prepare the bean factory for use in this context.
    prepareBeanFactory(beanFactory);
  - // Allows post-processing of the bean factory in context subclasses.
    postProcessBeanFactory(beanFactory);
  - // Invoke factory processors registered as beans in the context.
    invokeBeanFactoryPostProcessors(beanFactory);
  - // Register bean processors that intercept bean creation.
    registerBeanPostProcessors(beanFactory);
  - // Initialize message source for this context.
    initMessageSource();
  - // Initialize event multicaster for this context.
    initApplicationEventMulticaster();
  - // Initialize other special beans in specific context subclasses.
    onRefresh();
  - // Check for listener beans and register them.
    registerListeners();
  - // Instantiate all remaining (non-lazy-init) singletons.
    finishBeanFactoryInitialization(beanFactory);
  - // Last step: publish corresponding event.
    finishRefresh();
- afterRefresh
- listeners.started
- callRunners
- listeners.running
